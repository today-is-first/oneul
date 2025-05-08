import { formatTimeAgo } from "@/utils/date";
import { CheckInLog } from "../challengeDetail/ChallengeFeed";
import CheckStatus from "../common/CheckStatus";

export interface MateFeedItemProps {
  log: CheckInLog;
  onClick?: () => void;
}

function FeedCheckItem({ log, onClick }: MateFeedItemProps) {
  return (
    <li
      onClick={onClick}
      className="hover:border-point group cursor-pointer list-none rounded-lg border border-gray-700 p-4"
    >
      <a href="#" className="flex items-center gap-4">
        <img
          className="w-26 h-20 rounded-sm"
          src={log.image_url}
          alt="챌린지메이트 인증"
        />
        <div className="flex h-[76px] w-[130px] flex-1 flex-col items-baseline justify-between">
          <CheckStatus type={log.check_status} />
          <div className="line-clamp-1 text-sm font-normal text-gray-400">
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

export default FeedCheckItem;
