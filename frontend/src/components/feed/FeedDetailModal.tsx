import { useEffect, useRef, useState } from "react";
import { formatTimeAgo } from "@/utils/date";
import { Feed } from "@/types/Feed";
import { FaHeart } from "react-icons/fa";

function FeedDetailModal({
  isOpen,
  onClose,
  feed,
}: {
  isOpen: boolean;
  onClose: () => void;
  feed: Feed | null;
}) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [likeCount, setLikeCount] = useState(feed?.likeCount || 0);
  const [liked, setLiked] = useState(false);
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

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  if (!isOpen || !feed) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        className={`min-h-[550px] w-[450px] transform overflow-hidden rounded-2xl border border-white/10 text-white shadow-[0_4px_40px_rgba(0,0,0,0.6)] transition-all duration-300 ${
          showAnimation ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* 상단: 닉네임 + 닫기 버튼 */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <img
              src={feed.profileImg || "/svgs/default-profile.svg"}
              alt="프로필"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-sm font-semibold">{feed.nickname}</span>
          </div>
          <button
            onClick={onClose}
            className="text-lg text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* 이미지 */}
        {feed.imageUrl && (
          <img
            src={feed.imageUrl}
            alt="Feed"
            className="h-[400px] w-full object-cover"
          />
        )}

        {/* 본문 */}
        <div className="space-y-4 border border-white/10 px-5 py-4 shadow backdrop-blur-md">
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-white">
            {feed.content}
          </p>

          {/* 시간 + 좋아요 */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>{formatTimeAgo(feed.createdAt)}</span>
            <button
              onClick={handleLike}
              className="flex items-center gap-1 font-semibold hover:opacity-80"
            >
              <FaHeart
                size={14}
                className={liked ? "text-purple-400" : "text-gray-400"}
              />
              <span className={liked ? "text-purple-400" : "text-gray-400"}>
                {likeCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedDetailModal;
