package store.oneul.mvc.payment.event;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentConfirmedEvent {
    private Long userId;
    private Long challengeId;
    private String orderId;
    private String paymentKey;
    private int amount;
}
