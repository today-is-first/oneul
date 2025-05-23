package store.oneul.mvc.payment.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PaymentReceiptDTO {
    private Long paymentId;
    private String challengeName;     // JOIN으로 받아온 값
    private LocalDateTime updatedAt;  // 결제 완료 시점
    private int amount;               // 결제 금액
    private String status;            // PAID, REFUNDED 등
    private String method;            // CARD, TOSS 등
}
