package store.oneul.mvc.payment.service;

import store.oneul.mvc.payment.dto.PaymentConfirmRequest;
import store.oneul.mvc.payment.dto.TossConfirmResponse;

public interface TossConfirmService {
	
	public TossConfirmResponse confirm(PaymentConfirmRequest request);

}
