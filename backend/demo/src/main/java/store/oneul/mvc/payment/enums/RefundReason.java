package store.oneul.mvc.payment.enums;

public enum RefundReason {
    TX_FAIL("AUTO_REFUND"),
    USER_CANCEL("USER_CANCEL"),
    CHALLENGE_SUCCESS("COMPENSATION");

    private final String dbValue;

    RefundReason(String dbValue) {
        this.dbValue = dbValue;
    }

    public String toDbValue() {
        return dbValue;
    }

    public static RefundReason fromDbValue(String dbValue) {
        for (RefundReason reason : values()) {
            if (reason.dbValue.equalsIgnoreCase(dbValue)) {
                return reason;
            }
        }
        throw new IllegalArgumentException("Unknown DB refund type: " + dbValue);
    }
}
