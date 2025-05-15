import { Feed } from "@/types/Feed";
import FeedCheckItem from "./FeedCheckItem";
import { useChallengeFeeds } from "@/hooks/useFeed";
import { useParams } from "react-router";

interface FeedCheckListProps {
  onFeedSelect: (feed: Feed) => void;
}

function FeedCheckList({ onFeedSelect }: FeedCheckListProps) {
  const { challengeId } = useParams<{ challengeId: string }>();
  const { data } = useChallengeFeeds(challengeId ?? "");

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
      {data ? (
        data.map((item) => (
          <FeedCheckItem
            key={item.id}
            feed={item}
            onClick={() => onFeedSelect(item)}
          />
        ))
      ) : (
        <p>피드 내역이 존재하지 않습니다.</p>
      )}
    </div>
  );
}

export default FeedCheckList;
