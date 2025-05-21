package store.oneul.mvc.payment.service;

import store.oneul.mvc.payment.event.PaymentConfirmedEvent;

public interface CompensationService {

    void handleConfirmFail(PaymentConfirmedEvent event);  // 결제 실패 시 보상 처리
}
