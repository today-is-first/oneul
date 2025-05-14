import { formatTimeAgo } from "@/utils/date";
import { Feed } from "@/types/Feed";

export interface MateFeedItemProps {
  feed: Feed;
  onClick?: () => void;
}

function MateFeedItem({ feed, onClick }: MateFeedItemProps) {
  return (
    <li onClick={onClick} className="group">
      <a href="#" className="flex items-center gap-4">
        <img
          className="w-26 h-20 rounded-sm"
          src={feed.imageUrl}
          alt="오늘 챌린지메이트 인증"
        />
        <div className="flex h-[76px] w-[130px] flex-1 flex-col justify-between">
          <div className="line-clamp-2 font-normal text-gray-400 group-hover:text-gray-300">
            {feed.content}
          </div>
          <div className="flex justify-between gap-4 text-sm">
            <div className="text-gray-500">{feed.nickname}</div>
            <div className="text-gray-500">{formatTimeAgo(feed.createdAt)}</div>
          </div>
        </div>
      </a>
    </li>
  );
}

export default MateFeedItem;
