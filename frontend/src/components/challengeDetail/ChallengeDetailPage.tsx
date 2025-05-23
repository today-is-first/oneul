import ChallengeFeed from "./ChallengeFeed";
import ChallengeDetail from "./ChellengeDetail";
import ChallengeStatus from "./ChallengeStatus";
import { useParams } from "react-router";
import { useMyChallenge } from "@/hooks/useChallenge";
import Toast from "../Toast/Toast";
import { useEffect, useRef } from "react";
import { FiClock } from "react-icons/fi";

function ChallengeDetailPage() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const {
    data: challenge,
    isLoading,
    isError,
    error,
  } = useMyChallenge(challengeId ?? "");

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (
      challenge &&
      challenge.challengeStatus === "RECRUITING" &&
      !hasShownToast.current
    ) {
      Toast.caution("아직 시작하지 않은 챌린지입니다.");
      hasShownToast.current = true;
    }
  }, [challenge]);

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
                  startDate={challenge.startDate ?? 0}
                  status={challenge.challengeStatus}
                />
              </>
            ) : (
              <p>데이터를 불러오는데 실패했습니다.</p>
            )}
          </div>
          {challenge && challenge.challengeStatus !== "RECRUITING" ? (
            <ChallengeFeed status={challenge?.challengeStatus} />
          ) : (
            <div className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-[#1A1A1F] px-8 py-9 text-gray-300">
              <FiClock className="h-20 w-20" />
              <div className="flex flex-col items-center gap-3">
                <h4 className="text-2xl font-semibold">챌린지 오픈 대기중</h4>
                <span className="text-gray-400">
                  아직 시작하지 않은 챌린지입니다.
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ChallengeDetailPage;
