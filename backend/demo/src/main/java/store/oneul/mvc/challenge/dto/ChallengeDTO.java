package store.oneul.mvc.challenge.dto;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeDTO {
    private Long challengeId;
    private String name;
    private Long ownerId;
    private Long categoryId;
    private String description;
    private int totalDay;
    private int goalDay;
    private boolean isChallenge;
    private boolean isPublic;
    private String roomPassword;
    private LocalDate startDate;
    private LocalDate endDate;
    private int entryFee;
    private LocalDateTime createdAt;
}
