import { useRef, useState } from "react";
import ChatRoom from "@components/chat/ChatRoom";

function ChallengeDetailPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  // 배경 클릭 감지
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
      setIsChatOpen(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen select-none flex-col overflow-hidden bg-gradient-to-bl from-[#21414F] via-[#10212B] to-[#17171C]"
      onClick={isChatOpen ? handleBackgroundClick : undefined} // 채팅 열렸을 때만 배경 클릭 감지
    >
      {/* 챌린지 상세 정보 영역 */}
      <section className="flex flex-col items-center justify-center px-6 py-12">
        <h1 className="mb-6 text-2xl font-bold text-white">
          챌린지 상세 페이지
        </h1>
        <p className="max-w-2xl text-center text-gray-300">
          챌린지에 대한 설명이 이곳에 들어갑니다. 목표, 일정, 참가비 등의 정보를
          보여줄 수 있습니다.
        </p>

        {/* 채팅 열기/닫기 버튼 */}
        <button
          onClick={toggleChat}
          className="bg-point mt-8 rounded-full px-6 py-3 font-bold text-white transition-all hover:opacity-90"
        >
          {isChatOpen ? "채팅 닫기" : "채팅 열기"}
        </button>
      </section>

      {/* 채팅창 */}
      <section
        ref={chatRef}
        className={`bg-background absolute right-0 top-0 h-full w-full max-w-md shadow-lg transition-transform duration-500 ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()} // 채팅창 내부 클릭은 버블링 막기
      >
        <ChatRoom />
      </section>
    </div>
  );
}

export default ChallengeDetailPage;
