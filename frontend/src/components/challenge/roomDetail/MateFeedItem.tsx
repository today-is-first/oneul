import { CheckInLog } from "./ChallengeFeed";

export interface MateFeedItemProps {
  log: CheckInLog;
}

function MateFeedItem({ log }: MateFeedItemProps) {
  return (
    <li className="group">
      <a href="#" className="flex items-center gap-4">
        <div className="w-26 h-20 rounded-md bg-[#24242c]">{/* 이미지 */}</div>
        <div className="flex h-[76px] w-[130px] flex-1 flex-col justify-between">
          <div className="line-clamp-2 font-normal text-gray-400 group-hover:text-gray-300">
            {log.content}
          </div>
          <div className="flex justify-between gap-4 text-sm">
            <div className="text-gray-500">{log.userId}</div>
            <div className="text-gray-500">{log.date}</div>
          </div>
        </div>
      </a>
    </li>
  );
}

export default MateFeedItem;
