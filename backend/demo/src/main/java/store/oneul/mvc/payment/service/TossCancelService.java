package store.oneul.mvc.payment.service;

import store.oneul.mvc.payment.enums.RefundReason;
import store.oneul.mvc.payment.event.PaymentConfirmedEvent;

public interface TossCancelService {

	public int cancel(PaymentConfirmedEvent event, RefundReason reason);
}
