import ChallengeFeed from "./ChallengeFeed";
import ChallengeStatus from "./ChallengeStatus";
import ChallengeDetail from "./ChellengeDetail";

const mockData = {
  room_id: 1,
  name: "득근합시다",
  owner_id: 33,
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
};

function ChallengeRoomPage() {
  return (
    <div className="bg-background h-full w-full">
      <div className="w-7xl mx-auto flex gap-6 text-white">
        <ChallengeFeed />
        <div className="min-w-sm flex flex-col gap-8">
          <ChallengeDetail data={mockData} />
          <ChallengeStatus />
        </div>
      </div>
    </div>
  );
}

export default ChallengeRoomPage;
