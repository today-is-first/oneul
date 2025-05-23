import { useState } from "react";
import MyChallengeList from "@/components/mypage/MyChallengeList";
import MyFeedList from "@/components/mypage/MyFeedList";
import ReceiptList from "@/components/mypage/ReceiptList";

const tabs = [
  { key: "challenge", label: "참여한 챌린지" },
  { key: "feed", label: "인증 피드" },
  { key: "receipt", label: "영수증" },
];

function MyPage() {
  const [activeTab, setActiveTab] = useState("challenge");

  const renderContent = () => {
    switch (activeTab) {
      case "receipt":
        return <ReceiptList />;
      case "feed":
        return <MyFeedList />;
      case "challenge":
        return <MyChallengeList />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0E0E11] text-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 탭 메뉴 */}
        <div className="mb-6 flex space-x-4 border-b border-[#2c2c35]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`px-2 pb-2 text-lg font-semibold transition ${
                activeTab === tab.key
                  ? "border-b-2 border-[#7c3aed] text-white"
                  : "text-gray-500 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 컨텐츠 */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}

export default MyPage;
