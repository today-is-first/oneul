import { useState } from "react";
import MateFeedList from "../feed/MateFeedList";
import MyFeedCard from "../feed/MyFeedCard";
import FeedDetailModal from "@/components/feed/FeedDetailModal";
import FeedCreateModal from "@/components/feed/FeedCreateModal";
export interface CheckInLog {
  id: number;
  userId: number;
  imageUrl: string;
  challengeId: number;
  content: string;
  likeCount: number;
  date: string; // YYYY-MM-DD
}

type ModalState =
  | { kind: "create" }
  | { kind: "edit"; log: CheckInLog }
  | { kind: "detail"; log: CheckInLog }
  | null;

function ChallengeFeed() {
  const [modalState, setModalState] = useState<ModalState>(null);

  const openCreate = () => setModalState({ kind: "create" });
  const openEdit = (log: CheckInLog) => setModalState({ kind: "edit", log });
  const openDetail = (log: CheckInLog) =>
    setModalState({ kind: "detail", log });
  const closeAll = () => setModalState(null);

  const mockLog = {
    id: 1,
    userId: 22,
    imageUrl:
      "https://moneystory-phinf.pstatic.net/MjAyNTA0MzBfMTc4/MDAxNzQ1OTk5ODQ3NDEy.KFSsu5btM2b85Fbh5L19eRjuAJfHjEJK1Y6L92BOCW0g.-Kgt-2Za_nS5gvnyHdAN4BytLPsrGod77at3LzLcbRog.JPEG/4.30.1.jpeg",
    challengeId: 33,
    content:
      "test message nnnnnnnnnnnnnnnnnnnnnnnnnnasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
    likeCount: 0,
    date: "2025-05-01",
  };
  const logs: CheckInLog[] = [
    {
      id: 1,
      userId: 201,
      imageUrl: "https://picsum.photos/seed/1/200/200",
      challengeId: 5,
      content: "오운완입니다~^^ 오늘도 화이팅!",
      likeCount: 3,
      date: "2025-05-01",
    },
    {
      id: 2,
      userId: 202,
      imageUrl: "https://picsum.photos/seed/2/200/200",
      challengeId: 5,
      content: "스포애니에서 쇠질완료~ 뿌듯하네요 💪",
      likeCount: 5,
      date: "2025-05-01",
    },
    {
      id: 3,
      userId: 203,
      imageUrl: "https://picsum.photos/seed/3/200/200",
      challengeId: 5,
      content: "운동하다 회전근개 파열… 다들 조심하세요 😭",
      likeCount: 1,
      date: "2025-05-01",
    },
    {
      id: 4,
      userId: 204,
      imageUrl: "https://picsum.photos/seed/4/200/200",
      challengeId: 5,
      content: "인증합니다 💪🔥",
      likeCount: 0,
      date: "2025-05-01",
    },
    {
      id: 5,
      userId: 205,
      imageUrl: "https://picsum.photos/seed/5/200/200",
      challengeId: 5,
      content: "아침 조깅 5km 달렸어요!",
      likeCount: 4,
      date: "2025-05-01",
    },
    {
      id: 6,
      userId: 206,
      imageUrl: "https://picsum.photos/seed/6/200/200",
      challengeId: 5,
      content: "홈트 30분 끝~ 땀 뻘뻘",
      likeCount: 2,
      date: "2025-05-01",
    },
    {
      id: 7,
      userId: 207,
      imageUrl: "https://picsum.photos/seed/7/200/200",
      challengeId: 5,
      content: "오늘은 스트레칭 위주로!",
      likeCount: 1,
      date: "2025-05-01",
    },
    {
      id: 8,
      userId: 208,
      imageUrl: "https://picsum.photos/seed/8/200/200",
      challengeId: 5,
      content: "요가 20분 인증합니다🧘‍♀️",
      likeCount: 6,
      date: "2025-05-01",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-3 rounded-2xl border border-[#2d2d2d] bg-[#1A1A1F] px-8 py-9">
      <h2 className="mb-3 text-xl font-semibold text-gray-200">챌린지 피드</h2>
      <div className="flex gap-6">
        <div className="flex-1">
          <MyFeedCard
            log={mockLog}
            onCreate={openCreate}
            onEdit={openEdit}
            onDetail={openDetail}
          />
        </div>

        <div className="flex max-h-[560px] flex-1 flex-col gap-1">
          <h2 className="mb-3 text-base font-semibold text-gray-300">
            챌린지 메이트 인증 현황
          </h2>
          <MateFeedList logs={logs} onItemClick={openDetail} />
        </div>
      </div>

      {/* --- 모달 분기 --- */}
      {modalState?.kind === "create" && (
        <FeedCreateModal isOpen onClose={closeAll} />
      )}

      {modalState?.kind === "edit" && (
        <FeedCreateModal isOpen onClose={closeAll} />
      )}

      {modalState?.kind === "detail" && (
        <FeedDetailModal
          isOpen
          onClose={closeAll}
          feed={{
            id: modalState.log.id,
            image_url: modalState.log.imageUrl,
            content: modalState.log.content,
            like_count: modalState.log.likeCount,
            created_at: modalState.log.date,
            user: { nickname: `User ${modalState.log.userId}` },
          }}
        />
      )}
    </section>
  );
}

export default ChallengeFeed;
