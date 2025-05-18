package store.oneul.mvc.payment.controller;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.challenge.dto.ChallengeDTO;
import store.oneul.mvc.challenge.service.ChallengeService;
import store.oneul.mvc.common.exception.InvalidParameterException;
import store.oneul.mvc.common.exception.NotFoundException;
import store.oneul.mvc.payment.dto.OrderIdResponse;
import store.oneul.mvc.payment.dto.PaymentSessionDto;
import store.oneul.mvc.user.dto.UserDTO;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private static final int PAYMENT_SESSION_TTL_MINUTES = 15; // Redis TTL

    private final ChallengeService challengeService;

    @Qualifier("jsonRedisTemplate")
    private final RedisTemplate<String, Object> jsonRedisTemplate;

    @GetMapping("/order/{challengeId}")
    public ResponseEntity<OrderIdResponse> getOrderId(
            @PathVariable Long challengeId,
            @AuthenticationPrincipal UserDTO loginUser
    ) {
        Long userId = loginUser.getUserId();

        // 1. 챌린지 유효성 검증
        ChallengeDTO challenge = challengeService.getChallenge(challengeId);
        if (challenge == null) {
            throw new NotFoundException("챌린지를 찾을 수 없습니다.");
        }

        LocalDate today = LocalDate.now();

        if (challenge.getStartDate() != null && !today.isBefore(challenge.getStartDate())) {
            throw new InvalidParameterException("이미 시작된 챌린지는 참가할 수 없습니다.");
        }

        // 2. Redis 조회
        String redisKey = "payment:session:user:" + userId;
        PaymentSessionDto session = (PaymentSessionDto) jsonRedisTemplate.opsForValue().get(redisKey);

        if (session != null) {
            return ResponseEntity.ok(new OrderIdResponse(session.getOrderId(), session.getAmount()));
        }

        // 3. orderId 생성
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String orderId = "user" + userId + ":challenge" + challengeId + ":" + timestamp;

        // 4. Redis 저장
        PaymentSessionDto newSession = new PaymentSessionDto(orderId, challengeId, challenge.getEntryFee());
        jsonRedisTemplate.opsForValue().set(redisKey, newSession, Duration.ofMinutes(PAYMENT_SESSION_TTL_MINUTES));

        // 5. 응답 반환
        return ResponseEntity.ok(new OrderIdResponse(orderId, challenge.getEntryFee()));
    }
}

