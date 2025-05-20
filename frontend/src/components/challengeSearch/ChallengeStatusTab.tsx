interface ChallengeStatusTabProps {
  status: string;
  activeStatus: string;
  setActiveStatus: (status: string) => void;
}

function ChallengeStatusTab({
  status,
  activeStatus,
  setActiveStatus,
}: ChallengeStatusTabProps) {
  return (
    <button
      className={`rounded-full bg-[#2A2A2E] px-3 py-1.5 text-xs font-medium transition ${
        activeStatus === status
          ? "bg-[#8B5CF6] text-white"
          : "hover:bg-[#3A3A3E]"
      }`}
      onClick={() => setActiveStatus(status)}
    >
      {status}
    </button>
  );
}

export default ChallengeStatusTab;
