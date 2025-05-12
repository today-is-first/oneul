import { useState } from "react";
import { FaHeart, FaClock, FaFire, FaComments } from "react-icons/fa";
import ChatRoom from "@components/chat/ChatRoom";
import FeedCheckTab from "@components/feedCheck/FeedCheckTab";
import SidePanelToggleButton from "@components/sideBar/SidePanelToggleBtn";
import SidePanel from "@components/sideBar/SidePanel";
import { useSocketStore } from "@/stores/socketStore";

// 동적으로 구성할 수 있도록 PanelId는 string으로 정의
type PanelId = string;

function SideBar() {
  const [openPanel, setOpenPanel] = useState<PanelId | null>(null);

  const togglePanel = (panelId: PanelId) => {
    setOpenPanel((prev) => (prev === panelId ? null : panelId));
  };

  // 예시: 사용자가 구독 중인 챌린지 (실제로는 props나 API로 받아올 수 있음)
  const subscribedChallenges = [
    { id: 1, name: "루틴 만들기" },
    { id: 2, name: "다이어트 챌린지" },
    { id: 3, name: "플랭크 인증하기" },
  ];

  const { messages } = useSocketStore();

  console.log(messages);

  // 메뉴 구성: 동적 챌린지 + 고정 탭
  const menuItems = [
    ...subscribedChallenges.map((challenge) => ({
      icon: <FaHeart size={18} />,
      label: challenge.name,
      panelId: challenge.id,
    })),
    { divider: true },
  ];

  return (
    <>
      {/* 사이드바 */}
      <div className="fixed right-0 top-0 z-50 h-full w-16 bg-[#101014] text-white shadow-lg">
        <div className="flex h-full flex-col items-center justify-between py-4">
          <div className="flex flex-col items-center space-y-4 overflow-y-auto">
            {menuItems.map((item, idx) =>
              "divider" in item ? (
                <hr
                  key={`divider-${idx}`}
                  className="my-2 w-3/4 border-gray-700"
                />
              ) : (
                <SidePanelToggleButton
                  key={item.panelId}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => togglePanel(item.panelId.toString())}
                />
              ),
            )}
          </div>
        </div>
      </div>

      {/* 동적 챌린지 패널들 */}
      {subscribedChallenges.map((challenge) => (
        <SidePanel
          key={challenge.id}
          isOpen={openPanel === challenge.id.toString()}
          onClose={() => setOpenPanel(null)}
        >
          <ChatRoom
            challengeId={challenge.id}
            challengeName={challenge.name}
            messages={[]}
          />
        </SidePanel>
      ))}
    </>
  );
}

export default SideBar;
