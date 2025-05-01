import { CheckInLog } from "./ChallengeFeed";
import MateFeedItem from "./MateFeedItem";

interface MateFeedListProps {
  logs: CheckInLog[];
}

function MateFeedList({ logs }: MateFeedListProps) {
  return (
    <ul className="h-full space-y-4 overflow-y-auto pr-5">
      {logs.map((log) => (
        <MateFeedItem key={log.id} log={log} />
      ))}
    </ul>
  );
}

export default MateFeedList;
