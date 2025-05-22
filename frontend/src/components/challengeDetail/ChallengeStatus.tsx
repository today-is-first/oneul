import { ChallengeStatusType } from "@/types/Challenge";

interface ChallengeStatusProps {
  success: number;
  goal: number;
  startDate: string;
  endDate: string;
  status: ChallengeStatusType;
}

function ChallengeStatus({
  success,
  startDate,
  endDate,
  goal,
  status,
}: ChallengeStatusProps) {
  const elapsedDays =
    Math.floor(
      (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    ) + 1;
  const daysToStart =
    Math.floor(
      (new Date(startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    ) + 1;
  const successRate = Math.ceil((success / goal) * 100);
  if (status === "RECRUITING") {
    return (
      <div className="flex flex-col gap-6 rounded-2xl bg-[#1A1A1F] px-8 py-9">
        <h4 className="text-lg text-gray-200">나의 달성 현황</h4>
        <div className="flex flex-col gap-6 leading-7 text-gray-400">
          <p>
            아직 시작하지 않은 챌린지예요
            <br />
            <span className="text-primary-purple-100 font-medium">
              총 {goal}일 참여 시 성공!
            </span>
          </p>
          <p>
            오늘부터 챌린지 시작일까지
            <br />
            <span className="text-primary-purple-100 font-medium">
              {daysToStart}일 남았어요!
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-[#1A1A1F] px-8 py-9">
      <h4 className="text-lg text-gray-200">나의 달성 현황</h4>
      <div className="flex flex-col gap-6 leading-7 text-gray-400">
        <p>
          챌린지 시작일로부터 지금까지
          <br />
          <span className="text-primary-purple-100 font-medium">
            총 {success}일, {successRate > 100 ? 100 : successRate}% 달성 중
          </span>
        </p>
        <p>
          챌린지 종료일까지 {elapsedDays > 0 ? elapsedDays : 0}일 중<br />
          <span className="text-primary-purple-100 font-medium">
            {goal - success > 0 ? goal - success : 0}일 남았어요!
          </span>
        </p>
      </div>
    </div>
  );
}

export default ChallengeStatus;
