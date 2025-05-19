package store.oneul.mvc.payment.validator;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import store.oneul.mvc.common.exception.InvalidParameterException;
import store.oneul.mvc.payment.dao.PaymentDAO;
import store.oneul.mvc.payment.dto.PaymentConfirmRequest;
import store.oneul.mvc.payment.dto.PaymentSessionDto;

@Component
@RequiredArgsConstructor
public class PaymentValidator {

    @Qualifier("jsonRedisTemplate")
    private final RedisTemplate<String, Object> jsonRedisTemplate;
    private final PaymentDAO paymentDAO;

    public PaymentSessionDto validate(Long userId, PaymentConfirmRequest request) {
        String redisKey = "payment:session:user:" + userId;
        PaymentSessionDto session = (PaymentSessionDto) jsonRedisTemplate.opsForValue().get(redisKey);

        if (session == null) {
            throw new InvalidParameterException("결제 세션이 존재하지 않거나 만료되었습니다.");
        }

        if (!session.getOrderId().equals(request.getOrderId())) {
            throw new InvalidParameterException("orderId가 일치하지 않습니다.");
        }

        if (session.getAmount() != request.getAmount()) {
            throw new InvalidParameterException("결제 금액이 일치하지 않습니다.");
        }

        if (!session.getChallengeId().equals(request.getChallengeId())) {
            throw new InvalidParameterException("챌린지 정보가 일치하지 않습니다.");
        }

        if (paymentDAO.existsByPaymentKey(request.getPaymentKey())) {
            throw new InvalidParameterException("이미 결제가 처리되었습니다.");
        }

        return session;
    }
}
