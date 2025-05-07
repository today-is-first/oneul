package store.oneul.mvc.feed.service;

import java.util.List;

import store.oneul.mvc.feed.dto.FeedDTO;
import store.oneul.mvc.feed.dto.FeedEvaluationRequest;

public interface FeedService {
    public void createFeed(Long challengeId, FeedDTO feedDTO);

    public void updateFeed(Long challengeId, FeedDTO feedDTO);

    public void deleteFeed(Long challengeId, Long id);

    public FeedDTO getFeed(Long challengeId, Long id);

    public List<FeedDTO> getFeeds(Long challengeId);
    
    public void evaluateFeed(FeedEvaluationRequest feedEvaluationRequest);
}
