import { useSubscribedChallengeList } from "@/hooks/useChallenge";
import { useSocketStore } from "@/stores/socketStore";
import ChatRoom from "@components/chat/ChatRoom";
import SidePanel from "@components/sideBar/SidePanel";
import SidePanelToggleButton from "@components/sideBar/SidePanelToggleBtn";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import LoginBtn from "@components/common/LoginBtn";

// 동적으로 구성할 수 있도록 PanelId는 string으로 정의
type PanelId = string;

function SideBar() {
  const [openPanel, setOpenPanel] = useState<PanelId | null>(null);

  const togglePanel = (panelId: PanelId) => {
    setOpenPanel((prev) => (prev === panelId ? null : panelId));
  };

  const messages = useSocketStore((state) => state.messages);
  const subscribedChallengeList = useSubscribedChallengeList() ?? [];

  return (
    <>
      {/* 사이드바 */}
      <div className="fixed right-0 top-0 z-50 h-full w-20 bg-[#101014] text-white shadow-lg">
        <div className="flex h-full flex-col items-center justify-between py-4">
          <div className="flex flex-col items-center space-y-4 overflow-y-auto">
            <LoginBtn />
            <div className="h-px w-12 rounded-full bg-[#23232a]" />
            {subscribedChallengeList?.map((item) => (
              <SidePanelToggleButton
                key={item.challengeId}
                icon={<FaHeart size={18} />}
                label={item.name}
                onClick={() => togglePanel(item.challengeId.toString())}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 동적 챌린지 패널들 */}
      {subscribedChallengeList?.map((item) => {
        const messageList = messages[Number(item.challengeId)] ?? [];
        return (
          <SidePanel
            key={item.challengeId}
            isOpen={openPanel === item.challengeId.toString()}
            onClose={() => setOpenPanel(null)}
          >
            <ChatRoom
              challengeId={Number(item.challengeId)}
              challengeName={item.name}
              messages={messageList}
              isChatOpen={openPanel === item.challengeId.toString()}
            />
          </SidePanel>
        );
      })}
    </>
  );
}

export default SideBar;
