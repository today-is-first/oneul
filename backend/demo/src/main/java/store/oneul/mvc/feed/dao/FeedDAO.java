package store.oneul.mvc.feed.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import store.oneul.mvc.feed.dto.FeedDTO;

@Mapper
public interface FeedDAO {
    public void createFeed(Long challengeId, FeedDTO feedDTO);

    public void updateFeed(Long challengeId, FeedDTO feedDTO);

    public void deleteFeed(Long challengeId, Long id);

    public FeedDTO getFeed(Long challengeId, Long id);

    public List<FeedDTO> getFeeds(Long challengeId);
}
