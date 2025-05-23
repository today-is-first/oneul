package store.oneul.mvc.payment.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import store.oneul.mvc.payment.service.CancelRetryService;

@Slf4j
@Component
@RequiredArgsConstructor
public class ScheduledCancelRetryWorker {

    private final CancelRetryService cancelRetryService;

    // 5초마다 재시도
    @Scheduled(fixedDelay = 5000)
    public void retryCancelFromDLQ() {
        try {
            cancelRetryService.retryOnce();
        } catch (Exception e) {
            log.error("❌ DLQ 재시도 실패", e);
        }
    }
}
