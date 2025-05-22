package store.oneul.mvc.payment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TossCancelRequest {
    private int cancelAmount;
    private String cancelReason;
}
