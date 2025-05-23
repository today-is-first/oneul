package store.oneul.mvc.payment.controller;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import store.oneul.mvc.challenge.dto.ChallengeDTO;
import store.oneul.mvc.challenge.service.ChallengeService;
import store.oneul.mvc.common.exception.InvalidParameterException;
import store.oneul.mvc.common.exception.NotFoundException;
import store.oneul.mvc.payment.dto.OrderIdResponse;
import store.oneul.mvc.payment.dto.PaymentConfirmRequest;
import store.oneul.mvc.payment.dto.PaymentResultResponse;
import store.oneul.mvc.payment.dto.PaymentSessionDto;
import store.oneul.mvc.payment.service.PaymentStatusService;
import store.oneul.mvc.payment.usecase.PaymentUsecase;
import store.oneul.mvc.user.dto.UserDTO;

@Slf4j
@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private static final int PAYMENT_SESSION_TTL_MINUTES = 15; // Redis TTL

    private final ChallengeService challengeService;
    private final PaymentUsecase paymentUsecase;
    private final PaymentStatusService paymentStatusService;
    
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

        // 2. Redis 조회 - userId + challengeId 조합으로 고유 세션 키 생성
        String redisKey = "payment:session:user:" + userId + ":challenge:" + challengeId;
        PaymentSessionDto session = (PaymentSessionDto) jsonRedisTemplate.opsForValue().get(redisKey);

        if (session != null) {
            return ResponseEntity.ok(new OrderIdResponse(session.getOrderId(), session.getAmount()));
        }

        // 3. orderId 생성 (userId + challengeId + timestamp)
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String orderId = "user" + userId + "_challenge" + challengeId + "_" + timestamp;

        // 4. Redis 저장 (TTL 15분)
        PaymentSessionDto newSession = new PaymentSessionDto(orderId, challengeId, challenge.getEntryFee());
        jsonRedisTemplate.opsForValue().set(redisKey, newSession, Duration.ofMinutes(PAYMENT_SESSION_TTL_MINUTES));

        // 5. 응답 반환
        return ResponseEntity.ok(new OrderIdResponse(orderId, challenge.getEntryFee()));
    }

    
    @PostMapping("/confirm")
    public ResponseEntity<PaymentResultResponse> confirmPayment(
            @RequestBody PaymentConfirmRequest request,
            @AuthenticationPrincipal UserDTO loginUser
    ) {
        PaymentResultResponse response = paymentUsecase.confirmPayment(loginUser.getUserId(), request);
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/result/{orderId}")
    public DeferredResult<ResponseEntity<PaymentResultResponse>> getPaymentResult(@PathVariable String orderId) {
        // 최대 3분 대기
        DeferredResult<ResponseEntity<PaymentResultResponse>> output = new DeferredResult<>(180000L);

        // 매 요청마다 독립 스케줄러 (부하 없으면 이 구조 OK)
        ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
        final AtomicInteger checkCount = new AtomicInteger(0);

        executor.scheduleAtFixedRate(() -> {
            if (output.isSetOrExpired()) return;

            try {
                // 서비스로부터 상태 조회
                PaymentResultResponse res = paymentStatusService.getResultByOrderId(orderId);

                if (!"ROLLBACK_PENDING".equals(res.getStatus())) {
                    log.info("✅ 최종 상태 도달 → 응답 반환 (orderId: {}, status: {})", orderId, res.getStatus());
                    output.setResult(ResponseEntity.ok(res));
                    executor.shutdownNow();
                    return;
                }

                // 최대 3분 동안 polling (1초마다)
                if (checkCount.incrementAndGet() >= 180) {
                    log.warn("⚠️ ROLLBACK_PENDING 유지 → fallback 응답 (orderId: {})", orderId);
                    output.setResult(ResponseEntity.ok(res)); // 팬딩 그대로 반환
                    executor.shutdownNow();
                } else {
                    log.debug("⏳ 환불 대기 중... (orderId: {}, retry: {})", orderId, checkCount.get());
                }

            } catch (Exception e) {
                log.error("❌ 상태 조회 중 예외 발생 (orderId: {})", orderId, e);
                output.setResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(PaymentResultResponse.systemError(orderId)));
                executor.shutdownNow();
            }

        }, 0, 1, TimeUnit.SECONDS);

        // 종료 이벤트 핸들링
        output.onCompletion(executor::shutdownNow);
        output.onTimeout(executor::shutdownNow);
        output.onError(e -> {
            log.error("❌ 롱폴링 처리 중 예외", e);
            output.setResult(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(PaymentResultResponse.systemError(orderId)));
            executor.shutdownNow();
        });

        return output;
    }



}

