package store.oneul.mvc.feed.service;

import java.util.List;

import store.oneul.mvc.feed.dto.CommunityFeedDTO;
import store.oneul.mvc.feed.dto.FeedDTO;
import store.oneul.mvc.feed.dto.FeedEvaluationRequest;
import store.oneul.mvc.feed.dto.StreakDTO;
import store.oneul.mvc.feed.dto.ChallengeFeedDTO;

public interface FeedService {
    public void createFeed(Long challengeId, FeedDTO feedDTO);

    public void updateFeed(Long challengeId, FeedDTO feedDTO);

    public void updateFeedContent(Long challengeId, Long id, String content);

    public void deleteFeed(Long challengeId, Long id);

    public ChallengeFeedDTO getFeed(Long challengeId, Long id);

    public List<FeedDTO> getFeeds(Long challengeId);

    public List<FeedDTO> getMyFeeds(Long userId);

    public List<CommunityFeedDTO> getCommunityFeeds();

    public List<ChallengeFeedDTO> getChallengeFeeds(Long challengeId);

    public List<StreakDTO> getStreak(Long userId);

    public void evaluateFeed(FeedEvaluationRequest feedEvaluationRequest, Long userId);
}
