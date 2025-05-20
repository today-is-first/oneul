package store.oneul.mvc.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TossConfirmResponse {
    private String paymentKey;
    private String orderId;
    private int amount;
    private String status;
    private String approvedAt;
}
