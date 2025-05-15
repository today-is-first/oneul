import { Feed } from "@/types/Feed";
import MateFeedItem from "./MateFeedItem";

interface MateFeedListProps {
  feeds: Feed[];
  onItemClick?: (feed: Feed) => void;
}

function MateFeedList({ feeds, onItemClick }: MateFeedListProps) {
  return (
    <ul className="h-full space-y-4 overflow-y-auto pr-5">
      {feeds.map((feed) => (
        <MateFeedItem
          key={feed.id}
          feed={feed}
          onClick={() => onItemClick?.(feed)}
        />
      ))}
    </ul>
  );
}

export default MateFeedList;
