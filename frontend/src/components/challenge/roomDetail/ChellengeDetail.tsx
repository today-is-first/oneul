import Badge from "@/components/common/Badge";

interface ChallengeDetailProps {
  data: {
    room_id: number;
    name: string;
    owner_id: number;
    category_id: number;
    description: string;
    total_day: number;
    goal_day: number;
    is_challenge: boolean;
    is_public: boolean;
    room_password: string | null;
    start_date: string; // "2025-03-22"
    end_date: string; // "2025-05-23"
    created_at: string; // "2025-03-12 14:30:00"
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

function calculateSuccessRate(goalDay: number, totalDay: number): number {
  if (totalDay === 0) return 0; // total_day이 0인 경우 대비
  return Math.round((goalDay / totalDay) * 100);
}

function ChallengeDetail({ data }: ChallengeDetailProps) {
  return (
    <section className="flex flex-col gap-8 rounded-2xl border border-[#2d2d2d] bg-[#1A1A1F] px-8 py-9">
      {/* 상단 뱃지 + 제목 */}
      <div className="flex items-center gap-2">
        <Badge type={data.is_challenge ? "challenge" : "normal"}>
          {data.is_challenge ? "챌린지" : "일반"}
        </Badge>
        <h3 className="mt-1 text-xl font-bold text-gray-200">{data.name}</h3>
      </div>

      {/* 세부 정보 */}
      <div className="flex flex-col gap-y-4">
        {/* 기간 정보 */}
        <div className="flex flex-col gap-1 text-base">
          <span className="font-medium text-gray-300">챌린지 기간</span>
          <span className="leading-relaxed text-gray-400">
            {formatDate(data.start_date)} ~ {formatDate(data.end_date)}
          </span>
        </div>

        {/* 매니저 정보 */}
        <div className="flex flex-col gap-1 text-base">
          <span className="font-medium text-gray-300">챌린지 매니저</span>
          <span className="leading-relaxed text-gray-400">{data.owner_id}</span>
        </div>

        {/* 설명 */}
        <div className="flex flex-col gap-1 text-base">
          <span className="font-medium text-gray-300">챌린지 목표</span>
          <span className="leading-relaxed text-gray-400">
            {data.description}
          </span>
        </div>

        {/* 목표 달성률 */}
        <div className="flex flex-col gap-1 text-base">
          <span className="font-medium text-gray-300">목표 달성률</span>
          <span className="leading-relaxed text-gray-400">
            {calculateSuccessRate(data.goal_day, data.total_day)}% 이상
          </span>
        </div>
      </div>
    </section>
  );
}

export default ChallengeDetail;
