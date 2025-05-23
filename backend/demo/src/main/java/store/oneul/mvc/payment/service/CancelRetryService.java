package store.oneul.mvc.payment.service;

public interface CancelRetryService {
    void retryOnce(); // DLQ에서 1개 꺼내서 재시도
}
