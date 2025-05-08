import { useRef, useState } from "react";
import {
  FaChartBar,
  FaHeart,
  FaClock,
  FaFire,
  FaComments,
} from "react-icons/fa";

import ChatRoom from "../chat/ChatRoom";

function SideBar() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { icon: <FaChartBar size={18} />, label: "내 투자" },
    { icon: <FaHeart size={18} />, label: "관심" },
    { icon: <FaClock size={18} />, label: "최근 본" },
    { divider: true },
    { icon: <FaFire size={18} />, label: "실시간" },
    {
      icon: <FaComments size={18} />,
      label: "채팅",
      onClick: () => setIsChatOpen((prev) => !prev),
    },
  ];

  // 채팅 외 영역 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
      setIsChatOpen(false);
    }
  };

  return (
    <>
      {/* 오른쪽 고정 사이드바 */}
      <div className="fixed right-0 top-0 z-50 h-full w-16 bg-[#101014] text-white shadow-lg">
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
      {isChatOpen && (
        <div className="fixed inset-0 z-30" onClick={handleOverlayClick} />
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
    </>
  );
}

export default SideBar;
