package store.oneul.mvc.challenge.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeUserDTO {
    private Long challengeId;
    private Long userId;
    private int successDay;       // 기본 0
    private boolean isRefunded;   // 기본 false
    private int refundAmount;     // 기본 0
}
