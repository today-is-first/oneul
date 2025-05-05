package store.oneul.mvc.feed.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import store.oneul.mvc.feed.enums.CheckStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedDTO {
    private Long id;
    private Long userId;
    private Long challengeId;
    private String imageUrl;
    private String content;
    private int likeCount;
    private LocalDateTime createdAt;
    private CheckStatus checkStatus;
    private LocalDateTime checkedAt;
}
