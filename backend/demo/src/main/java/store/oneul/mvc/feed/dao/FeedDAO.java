package store.oneul.mvc.feed.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import store.oneul.mvc.feed.dto.FeedDTO;
import store.oneul.mvc.feed.dto.FeedEvaluationRequest;

@Mapper
public interface FeedDAO {
    public void createFeed(@Param("challengeId") Long challengeId, @Param("feedDTO") FeedDTO feedDTO);

    public void updateFeed(@Param("challengeId") Long challengeId, @Param("feedDTO") FeedDTO feedDTO);

    public void deleteFeed(@Param("challengeId") Long challengeId, @Param("id") Long id);

    public FeedDTO getFeed(@Param("challengeId") Long challengeId, @Param("id") Long id);

    public List<FeedDTO> getFeeds(@Param("challengeId") Long challengeId);
    
    public void evaluateFeed(FeedEvaluationRequest feedEvaluationRequest);
}
