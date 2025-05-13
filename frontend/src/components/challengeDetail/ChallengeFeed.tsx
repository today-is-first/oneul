import { useState } from "react";
import MateFeedList from "../feed/MateFeedList";
import MyFeedCard from "../feed/MyFeedCard";
import FeedDetailModal from "@/components/feed/FeedDetailModal";
import FeedCreateModal from "@/components/feed/FeedCreateModal";
import FeedUpdateModal from "@/components/feed/FeedUpdateModal";
import { useUserStore } from "@/stores/userStore";
import FeedCreateBtn from "@/components/feed/FeedCreateBtn";

export interface CheckInLog {
  id: number;
  user_id: number;
  challenge_id: number;
  image_url: string;
  content: string;
  like_count: number;
  created_at: string; // ISO 8601 형식 문자열 (예: "2025-05-07T12:34:56.000Z")
  check_status: "PENDING" | "APPROVED" | "REJECTED";
  checked_at: string | null; // 검수 전이면 null일 수 있음
}

type ModalState =
  | { kind: "create" }
  | { kind: "edit"; log: CheckInLog }
  | { kind: "detail"; log: CheckInLog }
  | null;

// mock data
const myCheckInLog: CheckInLog = {
  id: 1001,
  user_id: 1,
  challenge_id: 10,
  image_url: "https://picsum.photos/seed/1/400/400",
  content: "오늘은 등운동을 했습니다! 💪",
  like_count: 3,
  created_at: "2025-05-07T08:30:00.000Z",
  check_status: "APPROVED",
  checked_at: "2025-05-07T10:00:00.000Z",
};

const checkInLogs: CheckInLog[] = [
  {
    id: 1001,
    user_id: 1,
    challenge_id: 10,
    image_url: "https://picsum.photos/seed/1/400/400",
    content: "오늘은 등운동을 했습니다! 💪",
    like_count: 3,
    created_at: "2025-05-07T08:30:00.000Z",
    check_status: "APPROVED",
    checked_at: "2025-05-07T10:00:00.000Z",
  },
  {
    id: 1002,
    user_id: 2,
    challenge_id: 10,
    image_url: "https://picsum.photos/seed/3/400/400",
    content: "아침 러닝 완료했습니다 🏃",
    like_count: 5,
    created_at: "2025-05-07T07:50:00.000Z",
    check_status: "APPROVED",
    checked_at: "2025-05-07T09:00:00.000Z",
  },
  {
    id: 1003,
    user_id: 3,
    challenge_id: 10,
    image_url: "https://picsum.photos/seed/4/400/400",
    content: "헬스장 가는 길 인증 ✌️",
    like_count: 2,
    created_at: "2025-05-07T08:10:00.000Z",
    check_status: "PENDING",
    checked_at: null,
  },
];

function ChallengeFeed() {
  const [modalState, setModalState] = useState<ModalState>(null);

  // const { user } = useUserStore();

  const openCreate = () => setModalState({ kind: "create" });
  const openEdit = (log: CheckInLog) => setModalState({ kind: "edit", log });
  const openDetail = (log: CheckInLog) =>
    setModalState({ kind: "detail", log });
  const closeAll = () => setModalState(null);

  return (
    <section className="flex w-full flex-col gap-3 rounded-2xl border border-[#2d2d2d] bg-[#1A1A1F] px-8 py-9">
      <div className="flex items-center gap-4">
        <span className="text-center text-xl font-semibold text-gray-200">
          챌린지 피드
        </span>
        <FeedCreateBtn />
      </div>
      <div className="flex gap-6">
        <div className="flex-1">
          <MyFeedCard
            log={myCheckInLog}
            onCreate={openCreate}
            onEdit={openEdit}
            onDetail={openDetail}
          />
        </div>

        <div className="flex max-h-[560px] flex-1 flex-col gap-1">
          <h2 className="mb-3 text-base font-semibold text-gray-300">
            챌린지 메이트 인증 현황
          </h2>
          <MateFeedList logs={checkInLogs} onItemClick={openDetail} />
        </div>
      </div>

      {/* --- 모달 분기 --- */}
      {modalState?.kind === "create" && (
        <FeedCreateModal isOpen onClose={closeAll} />
      )}

      {modalState?.kind === "edit" && (
        <FeedUpdateModal isOpen onClose={closeAll} initialData={myCheckInLog} />
      )}

      {modalState?.kind === "detail" && (
        <FeedDetailModal isOpen onClose={closeAll} feed={modalState.log} />
      )}
    </section>
  );
}

export default ChallengeFeed;
