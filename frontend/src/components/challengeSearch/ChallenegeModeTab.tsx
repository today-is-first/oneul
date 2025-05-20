interface ChallenegeModeTabProps {
  tab: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function ChallenegeModeTab({
  tab,
  activeTab,
  setActiveTab,
}: ChallenegeModeTabProps) {
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
        activeTab === tab
          ? "bg-[#8B5CF6] text-white"
          : "bg-[#2A2A2E] text-white hover:bg-[#3A3A3E]"
      }`}
    >
      {tab}
    </button>
  );
}

export default ChallenegeModeTab;
