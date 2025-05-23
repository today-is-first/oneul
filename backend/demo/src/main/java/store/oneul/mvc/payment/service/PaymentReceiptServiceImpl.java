package store.oneul.mvc.payment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import store.oneul.mvc.payment.dao.PaymentDAO;
import store.oneul.mvc.payment.dto.PaymentReceiptDTO;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentReceiptServiceImpl implements PaymentReceiptService {

    private final PaymentDAO paymentDAO;

    @Override
    public List<PaymentReceiptDTO> getAllReceiptsByUser(long userId) {
        return paymentDAO.findReceiptDTOsByUserId(userId);
    }

}

