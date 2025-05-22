package store.oneul.mvc.payment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import store.oneul.mvc.payment.client.TossClient;
import store.oneul.mvc.payment.dto.PaymentConfirmRequest;
import store.oneul.mvc.payment.dto.TossConfirmResponse;

@Service
@RequiredArgsConstructor
public class TossConfirmServiceImpl implements TossConfirmService {

    private final TossClient tossClient;

    public TossConfirmResponse confirm(PaymentConfirmRequest request) {
        return tossClient.confirm(request);
    }
}
