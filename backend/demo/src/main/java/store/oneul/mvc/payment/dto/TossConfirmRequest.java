package store.oneul.mvc.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TossConfirmRequest {
    private String orderId;
    private String paymentKey;
    private int amount;
}
