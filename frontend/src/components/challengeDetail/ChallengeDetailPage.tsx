import ChallengeFeed from "./ChallengeFeed";
import ChallengeDetail from "./ChellengeDetail";
import ChallengeStatus from "./ChallengeStatus";
import { useParams } from "react-router";
import { useChallenge } from "@/hooks/useChallenge";

function ChallengeDetailPage() {
  const { challengeId } = useParams<{ challengeId: string }>();
  if (!challengeId) return <p>잘못된 경로입니다.</p>;

  const {
    data: challenge,
    isLoading,
    isError,
    error,
  } = useChallenge(challengeId);

  // 로딩 또는 에러시
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        로딩 중
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-400">
        에러: {(error as Error).message}
      </div>
    );
  }

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
            {challenge ? (
              <>
                <ChallengeDetail data={challenge} />
                <ChallengeStatus
                  success={challenge.successDay}
                  goal={challenge.goalDay}
                  endDate={challenge.endDate}
                />
              </>
            ) : (
              <p>데이터를 불러오는데 실패했습니다.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChallengeDetailPage;
