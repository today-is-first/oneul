import { Feed } from "@/types/Feed";
import FeedList from "@components/home/FeedList";
import { useCommunityFeeds } from "@/hooks/useFeed";

function CommunityFeedList({
  onFeedClick,
}: {
  onFeedClick: (feed: Feed) => void;
}) {
  const communityFeeds = useCommunityFeeds();
  return (
    <FeedList
      onFeedClick={onFeedClick}
      feeds={communityFeeds || []}
      feedType="community"
    />
  );
}

export default CommunityFeedList;
