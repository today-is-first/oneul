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
}
