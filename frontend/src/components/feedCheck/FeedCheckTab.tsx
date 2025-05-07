import { useState } from "react";
import FeedCheckItem from "./FeedCheckItem";
import FeedCheckModal from "./FeedCheckModal";
import { CheckInLog } from "../challengeDetail/ChallengeFeed";
import FeedCheckHeader from "./FeedCheckHeader";

interface CheckLogWithStatus {
  log: CheckInLog;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function FeedCheckTab() {
  // 목업 데이터 (나중에 API에서 받아온 데이터로 교체)
  const mockLogs: CheckLogWithStatus[] = [
    {
      log: {
        id: 1,
        userId: 201,
        imageUrl: "https://picsum.photos/seed/1/200/200",
        challengeId: 5,
        content: "오운완입니다~^^ 오늘도 화이팅!",
        likeCount: 3,
        date: "2025-05-01",
      },
      status: "PENDING",
    },
    {
      log: {
        id: 2,
        userId: 202,
        imageUrl: "https://picsum.photos/seed/2/200/200",
        challengeId: 5,
        content: "스포애니에서 쇠질완료~ 뿌듯하네요 💪",
        likeCount: 5,
        date: "2025-05-02",
      },
      status: "APPROVED",
    },
    {
      log: {
        id: 3,
        userId: 203,
        imageUrl: "https://picsum.photos/seed/3/200/200",
        challengeId: 5,
        content: "운동하다 회전근개 파열… 다들 조심하세요 😭",
        likeCount: 1,
        date: "2025-05-03",
      },
      status: "REJECTED",
    },
  ];

  const [selected, setSelected] = useState<CheckLogWithStatus | null>(null);

  return (
    <div className="flex flex-1 flex-col">
      <FeedCheckHeader />
      {/* 리스트 */}
      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
        {mockLogs.map((item) => (
          <FeedCheckItem
            key={item.log.id}
            log={item.log}
            status={item.status}
            onClick={() => setSelected(item)}
          />
        ))}
      </div>

      {/* 모달 */}
      {selected && (
        <FeedCheckModal
          isOpen={true}
          onClose={() => setSelected(null)}
          feed={{
            id: selected.log.id,
            image_url: selected.log.imageUrl,
            content: selected.log.content,
            like_count: selected.log.likeCount,
            created_at: selected.log.date,
            checkStatus: selected.status,
            user: { nickname: `User ${selected.log.userId}` },
          }}
        />
      )}
    </div>
  );
}
