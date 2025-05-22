package store.oneul.mvc.payment.service;

import store.oneul.mvc.payment.dto.TossConfirmResponse;

public interface PaymentSaveService {

    void save(Long userId, Long challengeId, TossConfirmResponse tossResponse);  // 결제 저장 및 처리
}
