import { useRef, useState } from "react";
import {
  FaChartBar,
  FaHeart,
  FaClock,
  FaFire,
  FaComments,
} from "react-icons/fa";

import ChatRoom from "../chat/ChatRoom";
import FeedCheckTab from "../feedCheck/FeedCheckTab";
function SideBar() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCheckOpen, setIsCheckOpen] = useState(false); // 체크탭 상태
  const chatRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<HTMLDivElement>(null); // 체크탭 ref

  const menuItems = [
    { icon: <FaChartBar size={18} />, label: "내 투자" },
    { icon: <FaHeart size={18} />, label: "관심" },
    { icon: <FaClock size={18} />, label: "최근 본" },
    { divider: true },
    { icon: <FaFire size={18} />, label: "실시간" },
    {
      icon: <FaComments size={18} />,
      label: "채팅",
      onClick: () => toggleChat(),
    },
    {
      icon: (
        <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 0 1 1 1v1.07A7.002 7.002 0 0 1 17.93 9H19a1 1 0 1 1 0 2h-1.07A7.002 7.002 0 0 1 11 17.93V19a1 1 0 1 1-2 0v-1.07A7.002 7.002 0 0 1 2.07 11H1a1 1 0 1 1 0-2h1.07A7.002 7.002 0 0 1 9 2.07V1a1 1 0 0 1 1-1zm0 3a5 5 0 1 0 0 10A5 5 0 0 0 10 5z" />
        </svg>
      ),
      label: "체크탭",
      onClick: () => toggleCheck(),
    },
  ];

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
    <>
      {/* 오른쪽 고정 사이드바 */}
      <div
        className="fixed right-0 top-0 z-50 h-full w-16 bg-[#101014] text-white shadow-lg"
        onClick={isChatOpen || isCheckOpen ? handleBackgroundClick : undefined} // 채팅 열렸을 때만 배경 클릭 감지
      >
        <div className="flex h-full flex-col items-center justify-between py-4">
          {/* 상단 메뉴 */}
          <div className="flex flex-col items-center space-y-4 overflow-y-auto">
            {menuItems.map((item, idx) =>
              item.divider ? (
                <hr key={idx} className="my-2 w-3/4 border-gray-700" />
              ) : (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onClick?.();
                  }}
                  className="flex w-full flex-col items-center justify-center py-2 transition hover:bg-[#1f1f25]"
                >
                  {item.icon}
                  <span className="mt-1 text-xs text-gray-300">
                    {item.label}
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
      </div>

      {/* 채팅창 바깥 클릭 감지를 위한 오버레이 */}
      {(isChatOpen || isCheckOpen) && (
        <div className="fixed inset-0 z-30" onClick={handleBackgroundClick} />
      )}

      {/* 채팅 패널 */}
      <div
        ref={chatRef}
        className={`bg-black-chat fixed right-16 top-0 z-40 h-full w-80 text-white shadow-xl transition-transform duration-500 ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <ChatRoom />
      </div>

      {/* 체크탭 슬라이드 패널 */}
      <section
        ref={checkRef}
        className={`bg-black-chat fixed right-16 top-0 z-40 h-full w-80 text-white shadow-xl transition-transform duration-500 ${
          isCheckOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <FeedCheckTab />
      </section>
    </>
  );
}

export default SideBar;
