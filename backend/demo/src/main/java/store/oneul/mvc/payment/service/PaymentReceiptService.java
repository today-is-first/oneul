package store.oneul.mvc.payment.service;

import java.util.List;
import store.oneul.mvc.payment.dto.PaymentReceiptDTO;

public interface PaymentReceiptService {
    List<PaymentReceiptDTO> getAllReceiptsByUser(long userId);
}