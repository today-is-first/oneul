import ChallengeFeed from "./ChallengeFeed";
import ChallengeDetail from "./ChellengeDetail";
import ChallengeStatus from "./ChallengeStatus";
import { Navigate, useNavigate, useParams } from "react-router";
import { useMyChallenge } from "@/hooks/useChallenge";
import Toast from "../Toast/Toast";
import { useEffect, useRef, useState } from "react";
import { FiClock } from "react-icons/fi";
import { useUserStore } from "@/stores/userStore";
import ChallengeFeedCheck from "../feedCheck/ChallengeFeedCheck";
import NotFoundPage from "../common/NotFoundPage";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const tabs = [
  { key: "challenge", label: "챌린지 디테일" },
  { key: "feedCheck", label: "피드 승인" },
];

function ChallengeDetailPage() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const idNum = Number(challengeId);
  const {
    data: challenge,
    isLoading,
    isError,
    error,
    statusCode,
  } = useMyChallenge(challengeId ?? "");
  const navigate = useNavigate();

  const hasShownToast = useRef(false);
  const [activeTab, setActiveTab] = useState("challenge");

  const { user } = useUserStore();
  const isManager = challenge?.ownerId === user?.id;

  useEffect(() => {
    if (
      challenge &&
      challenge.challengeStatus === "RECRUITING" &&
      !hasShownToast.current
    ) {
      Toast.caution("아직 시작하지 않은 챌린지입니다.");
      hasShownToast.current = true;
    }
    setActiveTab("challenge"); // 내부 액티브 탭 상태 초기화
  }, [challenge]);

  const renderContent = () => {
    if (!challenge) return;
    switch (activeTab) {
      case "challenge":
        if (challenge.challengeStatus !== "RECRUITING")
          return <ChallengeFeed status={challenge?.challengeStatus} />;
        return (
          <div className="flex w-full flex-col items-center justify-center gap-6 rounded-2xl bg-[#1A1A1F] px-8 py-9 text-gray-300">
            <FiClock className="h-20 w-20" />
            <div className="flex flex-col items-center gap-3">
              <h4 className="text-2xl font-semibold">챌린지 오픈 대기중</h4>
              <span className="text-gray-400">
                아직 시작하지 않은 챌린지입니다.
              </span>
            </div>
          </div>
        );
      case "feedCheck":
        if (!isManager) return;
        return <ChallengeFeedCheck />;
    }
  };

  if (Number.isNaN(idNum) || statusCode === 404) {
    return <NotFoundPage />;
  }

  if (statusCode === 403) {
    Toast.caution("참여중인 챌린지가 아닙니다.");
    navigate("/challenge/search", { replace: true });
  }

  if (statusCode === 401) {
    return <Navigate to="/login" replace state={{ showAuthToast: true }} />;
  }

  // 로딩 또는 에러시
  if (isLoading) {
    return (
      <div className="mt-[-60px] flex h-screen flex-col items-center justify-center gap-6">
        <AiOutlineLoading3Quarters className="text-primary-purple-100 h-10 w-10 animate-spin" />
        <p className="text-gray-300">챌린지 정보 불러오는 중</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="mt-[-60px] flex h-screen items-center justify-center text-red-400">
        에러: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full min-w-[1280px] select-none flex-col overflow-hidden bg-[#0E0E11]">
      {/* 챌린지 상세 정보 영역 */}
      <section className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center justify-center px-6 py-12">
        <div className="mb-6 flex space-x-4 self-baseline border-b border-[#2c2c35]">
          {tabs.map((tab) => {
            if (tab.key === "feedCheck" && !isManager) return null;
            return (
              <button
                key={tab.key}
                className={`px-2 pb-2 text-lg font-semibold transition ${
                  activeTab === tab.key
                    ? "border-b-2 border-[#7c3aed] text-white"
                    : "text-gray-500 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="mx-auto flex w-full items-stretch gap-6 text-white">
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
          {renderContent()}
        </div>
      </section>
    </div>
  );
}

export default ChallengeDetailPage;
