import { useEffect, useRef, useState } from "react";

interface Feed {
  id: number;
  image_url: string;
  content: string;
  like_count: number;
  created_at: string;
  user: {
    nickname: string;
  };
}

function FeedDetailModal({
  isOpen,
  onClose,
  feed,
}: {
  isOpen: boolean;
  onClose: () => void;
  feed: Feed;
}) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [likeCount, setLikeCount] = useState(feed.like_count);
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

  // 상대 시간 포맷 함수
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

  const handleLike = async () => {
    try {
      // TODO: 실제 API 호출로 변경
      // await axios.post(`/api/feeds/${feed.id}/like`);
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error(err);
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
        className={`flex w-[400px] transform flex-col gap-4 rounded-2xl bg-[#1B1B1E] p-6 text-white transition-all duration-300 ${
          showAnimation ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold">{feed.user.nickname}</span>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {feed.image_url && (
            <img
              src={feed.image_url}
              alt="Feed"
              className="mb-4 h-64 w-full rounded-lg object-cover"
            />
          )}

          <div className="max-h-[100px]">
            <p className="mb-4 w-[100%] whitespace-normal break-words">
              {feed.content}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            {formatTimeAgo(feed.created_at)}
          </span>
          <button
            onClick={handleLike}
            className="flex items-center space-x-1 text-sm font-semibold hover:opacity-80"
          >
            <span
              className={`inline-block ${liked ? "text-red-400" : "text-gray-400"}`}
            >
              ♥
            </span>
            <span>{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedDetailModal;
