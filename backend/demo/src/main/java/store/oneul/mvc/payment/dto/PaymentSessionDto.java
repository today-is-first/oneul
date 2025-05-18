package store.oneul.mvc.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSessionDto {
    private String orderId;
    private Long challengeId;
    private int amount;
}
