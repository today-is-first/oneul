package store.oneul.mvc.payment.service;

import store.oneul.mvc.payment.event.PaymentConfirmedEvent;

public interface CancelDLQService {

	 public void pushToQueue(PaymentConfirmedEvent event);
}
