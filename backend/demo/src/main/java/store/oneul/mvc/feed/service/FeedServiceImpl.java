package store.oneul.mvc.feed.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.feed.dao.FeedDAO;
import store.oneul.mvc.feed.dto.FeedDTO;
import store.oneul.mvc.feed.dto.FeedEvaluationRequest;
import store.oneul.mvc.workoutLog.dao.WorkoutLogDAO;
import store.oneul.mvc.workoutLog.dto.WorkoutLogInsertRequestDTO;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {
    private final FeedDAO feedDAO;
    private final WorkoutLogDAO workoutLogDAO;

    @Override
    public void createFeed(Long challengeId, FeedDTO feedDTO) {
        feedDAO.createFeed(challengeId, feedDTO);
    }

    @Override
    public void updateFeed(Long challengeId, FeedDTO feedDTO) {
        feedDAO.updateFeed(challengeId, feedDTO);
    }

    @Override
    public void deleteFeed(Long challengeId, Long id) {
        feedDAO.deleteFeed(challengeId, id);
    }

    @Override
    public FeedDTO getFeed(Long challengeId, Long id) {
        return feedDAO.getFeed(challengeId, id);
    }

    @Override
    public List<FeedDTO> getFeeds(Long challengeId) {
        return feedDAO.getFeeds(challengeId);
    }

	@Override
	public void evaluateFeed(FeedEvaluationRequest feedEvaluationRequest, Long userId) {
		feedDAO.evaluateFeed(feedEvaluationRequest);
		if("APPROVED".equals(feedEvaluationRequest.getCheckStatus())) {
			WorkoutLogInsertRequestDTO workoutLogRequest = new WorkoutLogInsertRequestDTO();
			workoutLogRequest.setChallengeId(feedEvaluationRequest.getChallengeId());
			workoutLogRequest.setFeedId(feedEvaluationRequest.getId());
			workoutLogRequest.setUserId(userId);
			workoutLogDAO.insertWorkoutLog(workoutLogRequest);
		}
	}

}
