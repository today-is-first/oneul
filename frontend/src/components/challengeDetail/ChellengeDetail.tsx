import Badge from "@/components/common/Badge";
import { Challenge } from "@/types/Challenge";

interface ChallengeDetailProps {
  data: Challenge;
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
  const {
    startDate,
    endDate,
    description,
    goalDay,
    totalDay,
    isChallenge,
    ownerNickname,
    name,
  } = data;
  return (
    <section className="flex flex-col gap-8 rounded-2xl border border-[#2d2d2d] bg-[#1A1A1F] px-8 py-9">
      {/* 상단 뱃지 + 제목 */}
      <div className="flex items-center gap-2">
        <Badge type={isChallenge ? "challenge" : "normal"}>
          {isChallenge ? "챌린지" : "일반"}
        </Badge>
        <div className="mt-1 flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-200">{name}</h3>
          <button
            onClick={() => {
              /** TODO: 모달 등록 */
            }}
            className="flex cursor-pointer items-center p-1 text-gray-500 hover:text-gray-200"
            aria-label="인원수 보기"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="currentColor"
            >
              <path d="M96-192v-92q0-25.78 12.5-47.39T143-366q54-32 114.5-49T384-432q66 0 126.5 17T625-366q22 13 34.5 34.61T672-284v92H96Zm648 0v-92q0-42-19.5-78T672-421q39 8 75.5 21.5T817-366q22 13 34.5 34.67Q864-309.65 864-284v92H744ZM384-480q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42Zm336-144q0 60-42 102t-102 42q-8 0-15-.5t-15-2.5q25-29 39.5-64.5T600-624q0-41-14.5-76.5T546-765q8-2 15-2.5t15-.5q60 0 102 42t42 102ZM168-264h432v-20q0-6.47-3.03-11.76-3.02-5.3-7.97-8.24-47-27-99-41.5T384-360q-54 0-106 14t-99 42q-4.95 2.83-7.98 7.91-3.02 5.09-3.02 12V-264Zm216.21-288Q414-552 435-573.21t21-51Q456-654 434.79-675t-51-21Q354-696 333-674.79t-21 51Q312-594 333.21-573t51 21ZM384-264Zm0-360Z" />
            </svg>
            <span>{4}</span>
          </button>
        </div>
      </div>

      {/* 세부 정보 */}
      <div className="flex flex-col gap-y-4">
        {/* 기간 정보 */}
        <div className="flex flex-col gap-1 text-base">
          <span className="font-medium text-gray-300">챌린지 기간</span>
          <span className="leading-relaxed text-gray-400">
            {formatDate(startDate)} ~ {formatDate(endDate)}
          </span>
        </div>

        {/* 매니저 정보 */}
        <div className="flex flex-col gap-1 text-base">
          <span className="font-medium text-gray-300">챌린지 매니저</span>
          <span className="leading-relaxed text-gray-400">{ownerNickname}</span>
        </div>

        {/* 설명 */}
        <div className="flex flex-col gap-1 text-base">
          <span className="font-medium text-gray-300">챌린지 목표</span>
          <span className="leading-relaxed text-gray-400">{description}</span>
        </div>

        {/* 목표 달성률 */}
        <div className="flex flex-col gap-1 text-base">
          <span className="font-medium text-gray-300">목표 달성률</span>
          <span className="leading-relaxed text-gray-400">
            {calculateSuccessRate(goalDay, totalDay)}% 이상
          </span>
        </div>
      </div>
    </section>
  );
}

export default ChallengeDetail;
