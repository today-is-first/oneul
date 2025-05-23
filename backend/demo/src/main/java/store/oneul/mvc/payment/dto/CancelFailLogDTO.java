package store.oneul.mvc.payment.dto;

import lombok.Builder;
import lombok.Data;
import store.oneul.mvc.payment.enums.RefundReason;

import java.time.LocalDateTime;

@Data
@Builder
public class CancelFailLogDTO {
    private Long id;
    private Long paymentId; // Optional
    private String orderId;
    private String paymentKey;
    private Long userId;
    private Long challengeId;
    private int amount;

    private String type; // USER_CANCEL, AUTO_REFUND, COMPENSATION
    private String errorStatus; // 예: "DLQ_RETRY_3_FAILED"
    private String reason;
    private String manualStatus; // WAITING_FORM / FORM_SUBMITTED

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public TossConfirmResponse toTossConfirmResponse() {
        return TossConfirmResponse.builder()
                .orderId(orderId)
                .paymentKey(paymentKey)
                .amount(amount)
                .approvedAt(createdAt != null ? createdAt.toString() : null)
                .build();
    }

}
