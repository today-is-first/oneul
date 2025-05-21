package store.oneul.mvc.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class PaymentResultResponse {

    private String status; // SUCCESS, ROLLBACK_REFUNDED, ROLLBACK_FAILED, TOSS_CONFIRM_FAILED
    private String message;

    private boolean manualRefundRequired;

    // Toss 결제 성공 시 제공
    private String orderId;
    private String paymentKey;
    private Integer paidAmount;
    private String approvedAt;

    // Toss 환불 성공 시 제공
    private Integer refundedAmount;
    private String refundedAt;

    // ✅ 결제 성공
    public static PaymentResultResponse success(TossConfirmResponse res) {
        return PaymentResultResponse.builder()
                .status("SUCCESS")
                .message("결제가 완료되었습니다.")
                .manualRefundRequired(false)
                .orderId(res.getOrderId())
                .paymentKey(res.getPaymentKey())
                .paidAmount(res.getAmount())
                .approvedAt(res.getApprovedAt())
                .build();
    }

    // ✅ 자동 환불 완료 (cancel 성공)
    public static PaymentResultResponse refunded(TossConfirmResponse res, int refundAmount, String refundedAt) {
        return PaymentResultResponse.builder()
                .status("ROLLBACK_REFUNDED")
                .message("결제 오류로 인해 환불 처리되었습니다.")
                .manualRefundRequired(false)
                .orderId(res.getOrderId())
                .paymentKey(res.getPaymentKey())
                .paidAmount(res.getAmount())
                .approvedAt(res.getApprovedAt())
                .refundedAmount(refundAmount)
                .refundedAt(refundedAt)
                .build();
    }

    // ✅ TossCancel 실패 → 수동 환불 유도
    public static PaymentResultResponse manualRefundRequired(TossConfirmResponse res) {
        return PaymentResultResponse.builder()
                .status("ROLLBACK_FAILED")
                .message("환불에 실패했습니다. 계좌 정보를 제출해주세요.")
                .manualRefundRequired(true)
                .orderId(res.getOrderId())
                .paymentKey(res.getPaymentKey())
                .paidAmount(res.getAmount())
                .approvedAt(res.getApprovedAt())
                .build();
    }
}
