package store.oneul.mvc.payment.dto;

import lombok.Data;
import store.oneul.mvc.payment.enums.RefundReason;
import store.oneul.mvc.payment.event.PaymentConfirmedEvent;

@Data
public class CancelRetryPayload {
    private Long userId;
    private Long challengeId;
    private String orderId;
    private String paymentKey;
    private int amount;
    private String refundType;
    private int retry;
    private Long paymentId; // optional

    //  paymentId가 없는 경우 (TX_FAIL) : 트랜잭션 실패 시
    public static CancelRetryPayload of(PaymentConfirmedEvent event, RefundReason reason, int retry) {
        CancelRetryPayload payload = new CancelRetryPayload();
        payload.setUserId(event.getUserId());
        payload.setChallengeId(event.getChallengeId());
        payload.setOrderId(event.getOrderId());
        payload.setPaymentKey(event.getPaymentKey());
        payload.setAmount(event.getAmount());
        payload.setRetry(retry);
        payload.setRefundType(reason.name());
        payload.setPaymentId(null);
        return payload;
    }
    
    // paymentId가 있는 경우 (USER_CANCEL, CHALLENGE_SUCCESS)
    public static CancelRetryPayload ofWithPaymentId(
            PaymentConfirmedEvent event,
            RefundReason reason,
            int retry,
            Long paymentId
    ) {
        CancelRetryPayload payload = new CancelRetryPayload();
        payload.setUserId(event.getUserId());
        payload.setChallengeId(event.getChallengeId());
        payload.setOrderId(event.getOrderId());
        payload.setPaymentKey(event.getPaymentKey());
        payload.setAmount(event.getAmount());
        payload.setRetry(retry);
        payload.setRefundType(reason.name());
        payload.setPaymentId(paymentId); // 명시적으로 전달받은 ID
        return payload;
    }

}
