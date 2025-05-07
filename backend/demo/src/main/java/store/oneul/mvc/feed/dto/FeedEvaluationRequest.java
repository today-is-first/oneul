package store.oneul.mvc.feed.dto;

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
public class FeedEvaluationRequest {
	private Long id;
	private Long challengeId;
	private CheckStatus checkStatus;
}
