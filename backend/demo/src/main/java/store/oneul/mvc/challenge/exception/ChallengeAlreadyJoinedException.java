package store.oneul.mvc.challenge.exception;

public class ChallengeAlreadyJoinedException extends RuntimeException {
    public ChallengeAlreadyJoinedException(Long challengeId, Long userId) {
        super("챌린지 " + challengeId + "에 사용자 " + userId + "가 이미 참여 중입니다.");
    }
}