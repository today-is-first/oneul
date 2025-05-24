package store.oneul.mvc.payment.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.payment.dao.PaymentDAO;
import store.oneul.mvc.payment.dto.CancelFailLogDTO;
import store.oneul.mvc.payment.dto.PaymentResultResponse;
import store.oneul.mvc.payment.dto.RefundReceiptDTO;
import store.oneul.mvc.payment.dto.TossConfirmResponse;

@Service
@RequiredArgsConstructor
public class PaymentStatusServiceImpl implements PaymentStatusService {

    private final PaymentDAO paymentDAO;

    @Override
    public PaymentResultResponse getResultByOrderId(String orderId) {
        RefundReceiptDTO receipt = paymentDAO.findRefundReceiptByOrderId(orderId);
        if (receipt != null) {
            return PaymentResultResponse.refunded(receipt.toTossConfirmResponse(), receipt.getRefundAmount(), receipt.getRefundedAt().toString());
        }

        CancelFailLogDTO failLog = paymentDAO.findCancelFailLogByOrderId(orderId);
        if (failLog != null) {
            return PaymentResultResponse.manualRefundRequired(failLog.toTossConfirmResponse());
        }

        // fallback
        return PaymentResultResponse.systemError(orderId);
    }
}
