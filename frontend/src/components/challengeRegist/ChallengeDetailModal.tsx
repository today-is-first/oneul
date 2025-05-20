// components/ChallengeDetailModal.tsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatTimeHHMM } from "@/utils/date";
import { Challenge } from "@/types/Challenge";
import Badge from "../common/Badge";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  challenge: Challenge;
}

export default function ChallengeDetailModal({
  isOpen,
  onClose,
  challenge,
}: Props) {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowAnimation(true), 10);
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleJoin = async () => {
    if (challenge.entryFee > 0) {
      // 유료 챌린지 → 결제 페이지로 이동
      navigate(`/challenge/${challenge.challengeId}/order`);
    } else {
      // 무료 챌린지 → 즉시 신청 API 호출
      try {
        await fetch(`/api/challenges/${challenge.challengeId}/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        onClose();
        // TODO: 성공 토스트, 리스트 리패치 등 추가
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        ref={modalRef}
        className={`flex w-[400px] transform flex-col gap-8 rounded-2xl bg-[#1B1B1E] p-8 text-white transition-all duration-300 ${
          showAnimation ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge type={challenge.challenge ? "challenge" : "normal"}>
              {challenge.challenge ? "챌린지" : "일반"}
            </Badge>
            <h2 className="text-xl font-semibold">{challenge.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* 본문 */}
        <div className="max-h-[400px] space-y-2 overflow-y-auto">
          <div className="text-sm text-gray-400">
            챌린지 매니저: {challenge.ownerNickname}
          </div>

          <div className="text-sm text-gray-400">
            기간: {challenge.startDate.split("T")[0]}{" "}
            {challenge.startDate.includes("T") && (
              <span>{formatTimeHHMM(challenge.startDate)}</span>
            )}{" "}
            ~ {challenge.endDate.split("T")[0]}{" "}
            {challenge.endDate.includes("T") && (
              <span>{formatTimeHHMM(challenge.endDate)}</span>
            )}
          </div>

          <div className="text-sm text-gray-400">
            목표: {challenge.successDay ?? 0}일 달성 / 총 {challenge.totalDay}일
          </div>
          <div className="text-sm text-gray-400">
            참가비:{" "}
            {challenge.entryFee > 0
              ? `${challenge.entryFee.toLocaleString()}원`
              : "무료"}
          </div>
          <p className="mt-6 whitespace-pre-wrap text-sm text-gray-300">
            {challenge.description}
          </p>
        </div>

        {/* 푸터 */}
        <div className="flex justify-end">
          <button
            onClick={handleJoin}
            disabled={challenge.challengeStatus !== "RECRUITING"}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              challenge.challengeStatus === "RECRUITING"
                ? "bg-primary-purple-200 text-white hover:opacity-90"
                : "cursor-not-allowed bg-gray-600 text-gray-300"
            }`}
          >
            {challenge.challengeStatus === "RECRUITING"
              ? "참여하기"
              : "모집 종료"}
          </button>
        </div>
      </div>
    </div>
  );
}
