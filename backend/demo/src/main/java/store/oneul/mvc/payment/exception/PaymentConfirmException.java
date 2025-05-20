package store.oneul.mvc.payment.exception;

import lombok.Getter;
import store.oneul.mvc.payment.dto.TossErrorInfo;

@Getter
public class PaymentConfirmException extends RuntimeException {
    private final TossErrorInfo tossError;

    public PaymentConfirmException(TossErrorInfo tossError) {
        super(tossError.getMessage()); // 메시지를 RuntimeException 메시지로도 사용
        this.tossError = tossError;
    }
}
