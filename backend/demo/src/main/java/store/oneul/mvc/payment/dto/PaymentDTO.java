package store.oneul.mvc.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {
    private Long userId;
    private Long challengeId;
    private String orderId;
    private String paymentKey;
    private int amount;
    private String status; // "PAID", "CANCELED" 등
}
