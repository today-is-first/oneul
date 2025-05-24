package store.oneul.mvc.payment.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import store.oneul.mvc.payment.dao.PaymentDAO;
import store.oneul.mvc.payment.dto.CancelRetryPayload;
import store.oneul.mvc.payment.dto.RefundReceiptDTO;
import store.oneul.mvc.payment.event.PaymentConfirmedEvent;

@Slf4j
@Service
@RequiredArgsConstructor
public class RefundReceiptServiceImpl implements RefundReceiptService {

    private final PaymentDAO paymentDAO;

    @Override
    public void recordAutoRefund(PaymentConfirmedEvent event, int refundAmount, String reason) {
        RefundReceiptDTO receipt = new RefundReceiptDTO();
        receipt.setUserId(event.getUserId());
        receipt.setChallengeId(event.getChallengeId());
        receipt.setPaymentId(null); // 결제 실패 시 null
        receipt.setRefundMethod("TOSS_AUTO");
        receipt.setRefundAmount(refundAmount);
        receipt.setRefundedAt(LocalDateTime.now());
        receipt.setTransactionId("TOSS_CANCEL_" + event.getPaymentKey());
        receipt.setNote("orderId: " + event.getOrderId() + " / " + reason);

        paymentDAO.insertRefundReceipt(receipt);
        log.info("💾 환불 내역 저장 완료 (userId: {}, amount: {})", event.getUserId(), refundAmount);
    }
    
    @Override
    public void recordRetryRefund(CancelRetryPayload payload, int refundAmount, String reason) {
        RefundReceiptDTO receipt = new RefundReceiptDTO();
        receipt.setUserId(payload.getUserId());
        receipt.setChallengeId(payload.getChallengeId());
        receipt.setPaymentId(payload.getPaymentId()); // TX_FAIL은 null, 그 외에는 존재
        receipt.setRefundMethod("TOSS_AUTO");
        receipt.setRefundAmount(refundAmount);
        receipt.setRefundedAt(LocalDateTime.now());
        receipt.setTransactionId("TOSS_CANCEL_" + payload.getPaymentKey());
        receipt.setNote("orderId: " + payload.getOrderId() + " / " + reason);

        paymentDAO.insertRefundReceipt(receipt);
        log.info("💾 DLQ 환불 저장 완료 (userId: {}, retry: {}, amount: {})",
                 payload.getUserId(), payload.getRetry(), refundAmount);
    }

}
