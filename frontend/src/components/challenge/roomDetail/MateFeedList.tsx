import { CheckInLog } from "./ChallengeFeed";
import MateFeedItem from "./MateFeedItem";

interface MateFeedListProps {
  logs: CheckInLog[];
  onItemClick?: (log: CheckInLog) => void;
}

function MateFeedList({ logs, onItemClick }: MateFeedListProps) {
  return (
    <ul className="h-full space-y-4 overflow-y-auto pr-5">
      {logs.map((log) => (
        <MateFeedItem
          key={log.id}
          log={log}
          onClick={() => onItemClick?.(log)}
        />
      ))}
    </ul>
  );
}

export default MateFeedList;
