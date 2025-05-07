import { formatTimeAgo } from "@/utils/date";
import { CheckInLog } from "../challengeDetail/ChallengeFeed";

export interface MateFeedItemProps {
  log: CheckInLog;
  onClick?: () => void;
}

function MateFeedItem({ log, onClick }: MateFeedItemProps) {
  return (
    <li onClick={onClick} className="group">
      <a href="#" className="flex items-center gap-4">
        <img
          className="w-26 h-20 rounded-sm"
          src={log.image_url}
          alt="오늘 챌린지메이트 인증"
        />
        <div className="flex h-[76px] w-[130px] flex-1 flex-col justify-between">
          <div className="line-clamp-2 font-normal text-gray-400 group-hover:text-gray-300">
            {log.content}
          </div>
          <div className="flex justify-between gap-4 text-sm">
            <div className="text-gray-500">{log.user_id}</div>
            <div className="text-gray-500">{formatTimeAgo(log.created_at)}</div>
          </div>
        </div>
      </a>
    </li>
  );
}

export default MateFeedItem;
