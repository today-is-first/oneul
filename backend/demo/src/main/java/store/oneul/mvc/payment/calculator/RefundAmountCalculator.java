package store.oneul.mvc.payment.calculator;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import store.oneul.mvc.payment.enums.RefundReason;

public class RefundAmountCalculator {

    public static int calculate(int entryFee, LocalDate startDate, LocalDate now, RefundReason reason) {
        switch (reason) {
            case TX_FAIL:
                return entryFee;
            case CHALLENGE_SUCCESS:
                return (int) (entryFee * 0.78); // 세금 22% 제외
            case USER_CANCEL:
                if (now.isBefore(startDate)) return entryFee;
                long days = ChronoUnit.DAYS.between(startDate, now);
                if (days <= 4) return (int) (entryFee * 0.8);
                if (days <= 7) return (int) (entryFee * 0.5);
                return 0;
            default:
                return 0;
        }
    }
}
