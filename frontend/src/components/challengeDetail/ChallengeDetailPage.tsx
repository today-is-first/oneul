import ChallengeFeed from "./ChallengeFeed";
import ChallengeDetail from "./ChellengeDetail";
import ChallengeStatus from "./ChallengeStatus";
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
  const { challengeId } = useParams();

  return (
    <div className="relative flex min-h-screen select-none flex-col overflow-hidden bg-gradient-to-bl from-[#21414F] via-[#10212B] to-[#17171C]">
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
      </section>
    </div>
  );
}

export default ChallengeDetailPage;
