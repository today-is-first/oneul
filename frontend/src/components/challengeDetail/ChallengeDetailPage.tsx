import ChallengeFeed from "./ChallengeFeed";
import ChallengeDetail from "./ChellengeDetail";
import ChallengeStatus from "./ChallengeStatus";
import { useParams } from "react-router";
import { useChallenge } from "@/hooks/useChallenge";

function ChallengeDetailPage() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const {
    data: challenge,
    isLoading,
    isError,
    error,
  } = useChallenge(challengeId ?? "");

  if (!challengeId) return <p>잘못된 경로입니다.</p>;

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
    <div className="relative flex min-h-screen select-none flex-col overflow-hidden bg-[#0E0E11]">
      {/* 챌린지 상세 정보 영역 */}
      <section className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-7xl mx-auto flex gap-6 text-white">
          <div className="min-w-sm flex flex-col gap-8">
            {challenge ? (
              <>
                <ChallengeDetail data={challenge} />
                <ChallengeStatus
                  success={challenge.successDay ?? 0}
                  goal={challenge.goalDay ?? 0}
                  endDate={challenge.endDate ?? ""}
                />
              </>
            ) : (
              <p>데이터를 불러오는데 실패했습니다.</p>
            )}
          </div>
          <ChallengeFeed />
        </div>
      </section>
    </div>
  );
}

export default ChallengeDetailPage;
