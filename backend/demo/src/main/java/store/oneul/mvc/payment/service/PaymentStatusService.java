package store.oneul.mvc.payment.service;

import store.oneul.mvc.payment.dto.PaymentResultResponse;

public interface PaymentStatusService {
    PaymentResultResponse getResultByOrderId(String orderId);
}
