import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatTimeHHMM } from "@/utils/date";
import { Challenge } from "@/types/Challenge";
import Badge from "../common/Badge";
import { FiX } from "react-icons/fi";
import { IoMdLock } from "react-icons/io";
import { useJoinChallenge } from "@/hooks/useChallenge";
import { validatePassword } from "@/api/challenge";
import axios from "axios";

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
  const [password, setPassword] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // const isPrivate = useMemo(() => !challenge.public, [challenge.public]);
  const isPrivate = true;
  const isPaid = useMemo(() => challenge.entryFee > 0, [challenge.entryFee]);
  const isRecruiting = useMemo(
    () => challenge.challengeStatus === "RECRUITING",
    [challenge.challengeStatus],
  );
  const { mutateAsync: join, status: joinStatus } = useJoinChallenge();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowAnimation(true), 10);
    } else {
      setPassword("");
      setShowAnimation(false);
    }
  }, [isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleJoin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (challenge.entryFee > 0) {
      // 유료 챌린지
      // 비밀번호 있으면 -> 비밀번호 검증 -> 결제페이지로 이동
      // 추후 -> (비밀번호 정보 함께 가지고 감-이중 검증)
      if (isPrivate) {
        const ok = await validatePassword(challenge.challengeId, password);
        if (!ok) {
          alert("비밀번호가 틀렸습니다.");
          setPassword("");
          return;
        }
      }
      // 검증 통과 또는 비밀번호 없는 유료 챌린지
      onClose();
      navigate(`/challenge/${challenge.challengeId}/order`);
      setPassword("");
      return;
    } else {
      // 무료 챌린지 → 즉시 신청 API 호출
      try {
        await join({
          challengeId: challenge.challengeId,
          roomPassword: isPrivate ? password : undefined,
        });
        alert("챌린지 가입 성공");
        onClose();
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          const code = err.response.data?.errorCode;
          if (code === "INVALID_PARAMETER") {
            alert("잘못된 비밀번호입니다.");
          } else if (code === "CHALLENGE_ALREADY_JOINED") {
            alert("이미 가입한 챌린지입니다.");
          } else {
            alert("서버 오류가 발생했습니다.");
          }
        } else {
          alert("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setPassword("");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        className={`flex w-[400px] transform flex-col gap-6 rounded-2xl border border-gray-700 bg-[#1B1B1E] p-8 text-white transition-all duration-300 ${
          showAnimation ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* 헤더 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isPrivate && <IoMdLock className="h-5 w-5 text-gray-400" />}
              <Badge type={challenge.challenge ? "CHALLENGE" : "NORMAL"}>
                {challenge.challenge ? "챌린지" : "일반"}
              </Badge>
              <Badge type={isRecruiting ? "RECRUITING" : "ENDED"}>
                {isRecruiting ? "모집중" : "모집종료"}
              </Badge>
            </div>
            <FiX
              onClick={onClose}
              className="h-6 w-6 cursor-pointer text-gray-400 transition-colors hover:text-gray-200"
            />
          </div>
          <h2 className="line-clamp-1 max-w-full text-lg font-semibold">
            {challenge.name}
          </h2>
        </div>

        {/* 챌린지 정보 */}
        <div className="mb-2 flex flex-col gap-y-4">
          <div className="flex flex-col gap-1 text-base">
            <span className="text-sm font-medium text-gray-300">
              챌린지 매니저
            </span>
            <span className="text-sm leading-relaxed text-gray-400">
              {challenge.ownerNickname}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-base">
            <span className="text-sm font-medium text-gray-300">
              챌린지 기간
            </span>
            <span className="text-sm leading-relaxed text-gray-400">
              {challenge.startDate.split("T")[0]}{" "}
              {challenge.startDate.includes("T") && (
                <span>{formatTimeHHMM(challenge.startDate)}</span>
              )}{" "}
              ~ {challenge.endDate.split("T")[0]}{" "}
              {challenge.endDate.includes("T") && (
                <span>{formatTimeHHMM(challenge.endDate)}</span>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-base">
            <span className="text-sm font-medium text-gray-300">
              챌린지 목표
            </span>
            <span className="text-sm leading-relaxed text-gray-400">
              {challenge.totalDay}일 중{" "}
              {challenge.goalDay ?? challenge.totalDay}일 달성 (
              {Math.ceil((challenge.goalDay / challenge.totalDay) * 100)}%)
            </span>
          </div>
          <div className="flex flex-col gap-1 text-base">
            <span className="text-sm font-medium text-gray-300">참가비</span>
            <span className="text-sm leading-relaxed text-gray-400">
              {challenge.entryFee > 0
                ? `${challenge.entryFee.toLocaleString()}원`
                : "무료"}
            </span>
          </div>
          <div className="flex max-h-[100px] flex-col gap-1 text-base">
            <span className="text-sm font-medium text-gray-300">
              챌린지 안내
            </span>
            <span className="break-after-all overflow-y-auto break-all text-sm leading-relaxed text-gray-400">
              {challenge.description
                ? challenge.description
                : "설명이 없습니다."}
            </span>
          </div>
        </div>

        {/* 푸터 - 참가 신청 폼 */}
        <form
          onSubmit={handleJoin}
          className="flex items-center justify-end gap-2"
        >
          {/* 비밀방이면 패스워드 입력 */}
          {isPrivate && isRecruiting && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="focus:border-primary-purple-100 border-input-gray bg-input-gray h-10 flex-1 rounded-md border px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
            />
          )}
          <button
            type="submit"
            disabled={!isRecruiting && joinStatus !== "pending"}
            className={`h-10 rounded-md px-4 py-2 text-sm font-semibold transition ${
              isRecruiting
                ? "bg-primary-purple-200 text-white hover:opacity-90"
                : "cursor-not-allowed bg-gray-600 text-gray-300"
            }`}
          >
            {!isRecruiting ? "모집 종료" : isPaid ? "결제하기" : "참여하기"}
          </button>
        </form>
      </div>
    </div>
  );
}
