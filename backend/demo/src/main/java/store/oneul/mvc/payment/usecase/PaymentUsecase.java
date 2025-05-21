package store.oneul.mvc.payment.usecase;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.payment.dto.PaymentConfirmRequest;
import store.oneul.mvc.payment.dto.PaymentSessionDto;
import store.oneul.mvc.payment.dto.TossConfirmResponse;
import store.oneul.mvc.payment.service.PaymentSaveService;
import store.oneul.mvc.payment.service.TossConfirmService;
import store.oneul.mvc.payment.validator.PaymentValidator;

@Service
@RequiredArgsConstructor
public class PaymentUsecase {

    private final PaymentValidator paymentValidator;
    private final TossConfirmService tossConfirmService;
    private final PaymentSaveService paymentSaveService;

    public TossConfirmResponse confirmPayment(Long userId, PaymentConfirmRequest request) {

        // 1. Redis + DB 기반 검증
        PaymentSessionDto session = paymentValidator.validate(userId, request);

        // 2. Toss API 결제 승인 호출
        TossConfirmResponse tossResponse = tossConfirmService.confirm(request);

        // 3. DB 저장 (@Transactional 내부)
        paymentSaveService.save(userId, session.getChallengeId(), tossResponse);


        // 4. 성공 응답 반환
        return tossResponse;

    }
}
