package store.oneul.mvc.payment.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class RefundReceiptDTO {
    private Long paymentId;           // Optional
    private Long cancelFailLogId;     // Optional
    private Long userId;
    private Long challengeId;
    private String refundMethod;      // TOSS_AUTO / MANUAL_BANK
    private int refundAmount;
    private LocalDateTime refundedAt;
    private String transactionId;     // Toss 기준: receiptKey or transaction id
    private String note;
    
    private String orderId;
    private String paymentKey;
    
    // paymentKey 있을 경우 환불 
    public TossConfirmResponse toTossConfirmResponse() {
        return TossConfirmResponse.builder()
                .orderId(orderId) // 또는 별도로 관리되는 orderId가 있으면 그걸 넣어야 함
                .paymentKey(paymentKey) // Toss 기준 key가 없다면 적절히 대응
                .amount(refundAmount)
                .approvedAt(refundedAt != null ? refundedAt.toString() : null)
                .build();
    }

}
