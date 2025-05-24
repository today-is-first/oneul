package store.oneul.mvc.payment.service;

import store.oneul.mvc.payment.dto.CancelRetryPayload;
import store.oneul.mvc.payment.event.PaymentConfirmedEvent;

public interface RefundReceiptService {

    void recordAutoRefund(PaymentConfirmedEvent event, int refundAmount, String reason);
    void recordRetryRefund(CancelRetryPayload payload, int refundAmount, String reason);

    // 필요 시 수동 환불 확장도 가능
    // void recordManualRefund(...);
}
