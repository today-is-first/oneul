import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckInLog } from "../challengeDetail/ChallengeFeed";

function FeedCheckModal({
  isOpen,
  onClose,
  log,
}: {
  isOpen: boolean;
  onClose: () => void;
  log: CheckInLog;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    CheckInLog["check_status"]
  >(log.check_status);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedStatus(log.check_status);
      setTimeout(() => setShowAnimation(true), 10);
    } else {
      setShowAnimation(false);
    }
  }, [isOpen, log.check_status]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffSec = Math.floor((now.getTime() - past.getTime()) / 1000);
    if (diffSec < 60) return `${diffSec}초 전`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}분 전`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}시간 전`;
    const diffDay = Math.floor(diffHour / 24);
    return `${diffDay}일 전`;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // api 통신
      onClose();
    } catch (err) {
      console.error(err);
      alert(
        `${selectedStatus === "APPROVED" ? "승인" : "거절"} 처리 중 오류가 발생했습니다.`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        ref={modalRef}
        className={`flex w-[400px] transform flex-col gap-4 rounded-2xl bg-[#1B1B1E] p-6 text-white transition-all duration-300 ${
          showAnimation ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <span className="font-bold">{log.user_id}</span>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* 이미지 & 내용 */}
        <div className="max-h-[400px] overflow-y-auto">
          {log.image_url && (
            <img
              src={log.image_url}
              alt="Feed"
              className="mb-4 h-64 w-full rounded-lg object-cover"
            />
          )}
          <p className="mb-4 whitespace-normal break-words">{log.content}</p>
          <span className="text-sm text-gray-400">
            {formatTimeAgo(log.created_at)}
          </span>
        </div>

        {/* 상태 선택 */}
        <div className="mt-4 flex items-center justify-end">
          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as CheckInLog["check_status"])
            }
            className="focus:border-point w-32 rounded-lg border border-gray-700 bg-[#2A2A2D] px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
          >
            <option value="APPROVED">승인</option>
            <option value="REJECTED">거절</option>
          </select>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-point ml-2 cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            확인
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default FeedCheckModal;
