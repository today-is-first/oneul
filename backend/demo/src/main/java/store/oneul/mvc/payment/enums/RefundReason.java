package store.oneul.mvc.payment.enums;

public enum RefundReason {
    TX_FAIL,             // 트랜잭션 롤백 시 자동 환불
    USER_CANCEL,         // 유저가 자발적으로 환불 요청
    CHALLENGE_SUCCESS    // 챌린지 성공 → 세금 제외 환급
}
