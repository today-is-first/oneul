package store.oneul.mvc.feed.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.feed.dao.FeedDAO;
import store.oneul.mvc.feed.dto.ChallengeFeedDTO;
import store.oneul.mvc.feed.dto.CommunityFeedDTO;
import store.oneul.mvc.feed.dto.FeedDTO;
import store.oneul.mvc.feed.dto.FeedEvaluationRequest;
import store.oneul.mvc.feed.dto.StreakDTO;
import store.oneul.mvc.feed.enums.CheckStatus;
import store.oneul.mvc.upload.util.S3PresignedUrlGenerator;
import store.oneul.mvc.workoutLog.dao.WorkoutLogDAO;
import store.oneul.mvc.workoutLog.dto.WorkoutLogInsertRequestDTO;

@Service
@RequiredArgsConstructor
public class FeedServiceImpl implements FeedService {
    private final FeedDAO feedDAO;
    private final WorkoutLogDAO workoutLogDAO;
    private final S3PresignedUrlGenerator s3PresignedUrlGenerator;

    @Override
    public void createFeed(Long challengeId, FeedDTO feedDTO) {
        feedDAO.createFeed(challengeId, feedDTO);
    }

    @Override
    public void updateFeed(Long challengeId, FeedDTO feedDTO) {
        feedDAO.updateFeed(challengeId, feedDTO);
    }

    @Override
    public void updateFeedContent(Long challengeId, Long id, String content) {
        feedDAO.updateFeedContent(challengeId, id, content);
    }

    @Override
    public void deleteFeed(Long challengeId, Long id) {
        feedDAO.deleteFeed(challengeId, id);
    }

    @Override
    public FeedDTO getFeed(Long challengeId, Long id) {
        FeedDTO feed = feedDAO.getFeed(challengeId, id);
        if (!feed.getImageUrl().startsWith("uploads")) {
            return feed;
        }
        String presignedUrl = s3PresignedUrlGenerator.getPresignedUrlToDownload(feed.getImageUrl());
        feed.setImageUrl(presignedUrl);
        return feed;
    }

    @Override   
    public List<FeedDTO> getFeeds(Long challengeId) {
        List<FeedDTO> feeds = feedDAO.getFeeds(challengeId);
        for (FeedDTO feed : feeds) {
            if (!feed.getImageUrl().startsWith("uploads")) {
                continue;
            }
            String presignedUrl = s3PresignedUrlGenerator.getPresignedUrlToDownload(feed.getImageUrl());
            feed.setImageUrl(presignedUrl);
        }
        return feeds;
    }

    @Override
    public List<FeedDTO> getMyFeeds(Long userId) {
        List<FeedDTO> myFeeds = feedDAO.getMyFeeds(userId);
        for (FeedDTO feed : myFeeds) {
            if (!feed.getImageUrl().startsWith("uploads")) {
                continue;
            }
            String presignedUrl = s3PresignedUrlGenerator.getPresignedUrlToDownload(feed.getImageUrl());
            feed.setImageUrl(presignedUrl);
        }
        return myFeeds;
    }

    @Override
    public List<CommunityFeedDTO> getCommunityFeeds() {
        List<CommunityFeedDTO> communityFeeds = feedDAO.getCommunityFeeds();
        for (CommunityFeedDTO communityFeed : communityFeeds) {
            if (!communityFeed.getImageUrl().startsWith("uploads")) {
                continue;
            }
            String presignedUrl = s3PresignedUrlGenerator.getPresignedUrlToDownload(communityFeed.getImageUrl());
            communityFeed.setImageUrl(presignedUrl);
        }
        return communityFeeds;
        
    }

    @Override
    public List<ChallengeFeedDTO> getChallengeFeeds(Long challengeId) {
        List<ChallengeFeedDTO> challengeFeeds = feedDAO.getChallengeFeeds(challengeId);
        for (ChallengeFeedDTO challengeFeed : challengeFeeds) {
            if (!challengeFeed.getImageUrl().startsWith("uploads")) {
                continue;
            }
            String presignedUrl = s3PresignedUrlGenerator.getPresignedUrlToDownload(challengeFeed.getImageUrl());
            challengeFeed.setImageUrl(presignedUrl);
        }
        return challengeFeeds;
    }

    @Override
    public List<StreakDTO> getStreak(Long userId) {
        return feedDAO.getStreak(userId);
    }

    @Override
    public void evaluateFeed(FeedEvaluationRequest feedEvaluationRequest, Long userId) {
        feedDAO.evaluateFeed(feedEvaluationRequest);
		if(CheckStatus.APPROVED == feedEvaluationRequest.getCheckStatus()) {
			WorkoutLogInsertRequestDTO workoutLogRequest = new WorkoutLogInsertRequestDTO();
			workoutLogRequest.setChallengeId(feedEvaluationRequest.getChallengeId());
			workoutLogRequest.setFeedId(feedEvaluationRequest.getId());
			workoutLogRequest.setUserId(userId);
			workoutLogDAO.insertWorkoutLog(workoutLogRequest);
		}
	}

}
