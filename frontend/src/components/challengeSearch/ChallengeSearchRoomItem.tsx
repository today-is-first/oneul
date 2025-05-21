import { Challenge } from "@/types/Challenge";
import Badge from "@components/common/Badge";

interface ChallengeSearchRoomItemProps {
  challenge: Challenge;
  setSelected: (challenge: Challenge) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
}

function ChallengeSearchRoomItem({
  challenge,
  setSelected,
  setIsModalOpen,
}: ChallengeSearchRoomItemProps) {
  return (
    <div
      key={challenge.challengeId}
      className="cursor-pointer rounded-lg border border-[#2F2F33] bg-[#222227] p-5 shadow-sm transition hover:shadow-md"
      onClick={() => {
        setSelected(challenge);
        setIsModalOpen(true);
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="line-clamp-1 text-base font-semibold text-white">
          {challenge.name}
        </h3>
        <Badge type={challenge.challenge ? "CHALLENGE" : "NORMAL"}>
          {challenge.challenge ? "챌린지" : "일반"}
        </Badge>
      </div>
      <p className="mb-2 line-clamp-2 text-sm text-gray-400">
        {challenge.description}
      </p>
      <div className="text-xs text-gray-500">
        {challenge.totalDay}일 중 {challenge.goalDay}일 목표 ・ 참여자{" "}
        {challenge.memberCount || 0}명
      </div>
    </div>
  );
}

export default ChallengeSearchRoomItem;
