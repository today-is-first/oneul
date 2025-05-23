package store.oneul.mvc.payment.dao;

import org.apache.ibatis.annotations.Mapper;

import store.oneul.mvc.payment.dto.CancelFailLogDTO;
import store.oneul.mvc.payment.dto.PaymentDTO;
import store.oneul.mvc.payment.dto.RefundReceiptDTO;

@Mapper
public interface PaymentDAO {
    boolean existsByPaymentKey(String paymentKey);

    int insertPayment(PaymentDTO dto);
    
    int insertRefundReceipt(RefundReceiptDTO receipt);
    
    int insertCancelFailLog(CancelFailLogDTO dto);
    
    Long findIdByOrderId(String orderId);
    
    RefundReceiptDTO findRefundReceiptByOrderId(String orderId);
    
    CancelFailLogDTO findCancelFailLogByOrderId(String orderId);
}
