import { Feed } from "@/types/Feed";
import FeedCheckItem from "./FeedCheckItem";

interface FeedCheckListProps {
  onFeedSelect: (feed: Feed) => void;
}

const mockData: Feed[] = [
  {
    id: 1,
    user_id: 201,
    challenge_id: 5,
    image_url: "https://picsum.photos/seed/1/200/200",
    content: "오운완입니다~^^ 오늘도 화이팅!",
    like_count: 3,
    created_at: "2025-05-01T00:00:00.000Z",
    check_status: "PENDING",
    checked_at: null,
  },
  {
    id: 2,
    user_id: 202,
    challenge_id: 5,
    image_url: "https://picsum.photos/seed/2/200/200",
    content: "스포애니에서 쇠질완료~ 뿌듯하네요 💪",
    like_count: 5,
    created_at: "2025-05-02T00:00:00.000Z",
    check_status: "APPROVED",
    checked_at: "2025-05-02T01:00:00.000Z",
  },
  {
    id: 3,
    user_id: 203,
    challenge_id: 5,
    image_url: "https://picsum.photos/seed/3/200/200",
    content: "운동하다 회전근개 파열… 다들 조심하세요 😭",
    like_count: 1,
    created_at: "2025-05-03T00:00:00.000Z",
    check_status: "REJECTED",
    checked_at: "2025-05-03T02:00:00.000Z",
  },
];

function FeedCheckList({ onFeedSelect }: FeedCheckListProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
      {mockData.map((item) => (
        <FeedCheckItem
          key={item.id}
          feed={item}
          onClick={() => onFeedSelect(item)}
        />
      ))}
    </div>
  );
}

export default FeedCheckList;
