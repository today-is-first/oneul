import { useRef, useState } from "react";
import ChatRoom from "@components/chat/ChatRoom";
import ChallengeFeed from "./ChallengeFeed";
import ChallengeDetail from "./ChellengeDetail";
import ChallengeStatus from "./ChallengeStatus";
import FeedCheckTab from "../feedCheck/FeedCheckTab";
import { useParams } from "react-router";

const mockData = {
  name: "득근합시다",
  owner_id: 33,
  owner_nickname: "이찬",
  category_id: 1,
  description: "하루에 30분씩 무산소 근력 운동 하기",
  total_day: 56,
  goal_day: 45,
  is_challenge: true,
  is_public: false,
  room_password: "1234",
  start_date: "2025-03-22", // DATE
  end_date: "2025-05-23", // DATE
  created_at: "2025-03-12 14:30:00", // DATETIME
  success_day: 3,
  challenge_id: 1,
  entry_fee: 1000,
};

function ChallengeDetailPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCheckOpen, setIsCheckOpen] = useState(false); // 체크탭 상태
  const chatRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null); // 체크탭 r

  const { challengeId } = useParams();

  // 둘 중 하나만 열리게 함
  const toggleChat = () => {
    setIsChatOpen((prev) => {
      const next = !prev;
      if (next) setIsCheckOpen(false);
      return next;
    });
  };
  const toggleCheck = () =>
    setIsCheckOpen((prev) => {
      const next = !prev;
      if (next) setIsChatOpen(false);
      return next;
    });

  // 배경 클릭 감지
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      isChatOpen &&
      chatRef.current &&
      !chatRef.current.contains(e.target as Node)
    ) {
      setIsChatOpen(false);
    }
    if (
      isCheckOpen &&
      checkRef.current &&
      !checkRef.current.contains(e.target as Node)
    ) {
      setIsCheckOpen(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen select-none flex-col overflow-hidden bg-gradient-to-bl from-[#21414F] via-[#10212B] to-[#17171C]"
      onClick={isChatOpen || isCheckOpen ? handleBackgroundClick : undefined} // 채팅 열렸을 때만 배경 클릭 감지
    >
      {/* 챌린지 상세 정보 영역 */}
      <section className="flex flex-col items-center justify-center px-6 py-12">
        <h1 className="mb-6 text-2xl font-bold text-white">
          챌린지 상세 페이지 - {challengeId}
        </h1>
        <div className="w-7xl mx-auto flex gap-6 text-white">
          <ChallengeFeed />
          <div className="min-w-sm flex flex-col gap-8">
            <ChallengeDetail data={mockData} />
            <ChallengeStatus
              success={mockData.success_day}
              goal={mockData.goal_day}
              endDate={mockData.end_date}
            />
          </div>
        </div>

        <div className="flex gap-12">
          {/* 채팅 열기/닫기 버튼 */}
          <button
            onClick={toggleChat}
            className="bg-point mt-8 rounded-full px-6 py-3 font-bold text-white transition-all hover:opacity-90"
          >
            {isChatOpen ? "채팅 닫기" : "채팅 열기"}
          </button>
          {/* 체크탭 열기/닫기 */}
          <button
            onClick={toggleCheck}
            className="bg-point mt-8 rounded-full px-6 py-3 font-bold text-white transition-all hover:opacity-90"
          >
            {isCheckOpen ? "체크탭 닫기" : "체크탭 열기"}
          </button>
        </div>
      </section>

      {/* 채팅창 */}
      <section
        ref={chatRef}
        className={`bg-background absolute right-0 top-0 h-full w-full max-w-md shadow-lg transition-transform duration-500 ${
          isChatOpen ? "z-30 translate-x-0" : "z-10 translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // 채팅창 내부 클릭은 버블링 막기
      >
        <ChatRoom />
      </section>

      {/* 체크탭 슬라이드 패널 */}
      <section
        ref={checkRef}
        className={`bg-background absolute right-0 top-0 h-full w-full max-w-md shadow-lg transition-transform duration-500 ${
          isCheckOpen ? "z-20 translate-x-0" : "z-0 translate-x-full"
        } `}
        onClick={(e) => e.stopPropagation()}
      >
        <FeedCheckTab />
      </section>
    </div>
  );
}

export default ChallengeDetailPage;
