interface ChallengeStatusProps {
  success: number;
  goal: number;
  endDate: string;
}

function ChallengeStatus({ success, endDate, goal }: ChallengeStatusProps) {
  const elapsedDays =
    Math.floor(
      (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    ) + 1;
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#2d2d2d] bg-[#1A1A1F] px-8 py-9">
      <h4 className="text-lg text-gray-200">나의 달성 현황</h4>
      <div className="flex flex-col gap-6 leading-7 text-gray-400">
        <p>
          챌린지 시작일로부터 지금까지
          <br />
          <span className="text-point font-medium">
            총 {success}일, 100% 달성 중
          </span>
        </p>
        <p>
          챌린지 종료일까지 {elapsedDays > 0 ? elapsedDays : 0}일 중<br />
          <span className="text-point font-medium">
            {goal - success}일 남았어요!
          </span>
        </p>
      </div>
    </div>
  );
}

export default ChallengeStatus;
