import { formatTimeAgo } from "@/utils/date";
import CheckStatus from "../common/CheckStatus";
import { Feed } from "@/types/Feed";

export interface MateFeedItemProps {
  feed: Feed;
  onClick?: () => void;
}

function FeedCheckItem({ feed, onClick }: MateFeedItemProps) {
  return (
    <li
      onClick={onClick}
      className="hover:border-point group cursor-pointer list-none rounded-lg border border-gray-700 p-4"
    >
      <a href="#" className="flex items-center gap-4">
        <img
          className="w-26 h-20 rounded-sm"
          src={feed.imageUrl}
          alt="챌린지메이트 인증"
        />
        <div className="flex h-[76px] w-[130px] flex-1 flex-col items-baseline justify-between">
          <CheckStatus type={feed.checkStatus} />
          <div className="line-clamp-1 text-sm font-normal text-gray-400">
            {feed.content}
          </div>
          <div className="flex justify-between gap-4 text-sm">
            <div className="text-gray-500">{feed.userId}</div>
            <div className="text-gray-500">{formatTimeAgo(feed.createdAt)}</div>
          </div>
        </div>
      </a>
    </li>
  );
}

export default FeedCheckItem;
