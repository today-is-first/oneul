import { Feed } from "@/types/Feed";
import { formatTimeAgo } from "@/utils/date";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

function FeedDetailItem({
  feed,
  onClose,
}: {
  feed: Feed;
  onClose: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(feed.likeCount);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <>
      {/* 상단: 닉네임 + 닫기 버튼 */}
      <div className="flex items-center justify-between border border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <img
            src={feed.profileImg || "/svgs/default-profile.svg"}
            alt="프로필"
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold">{feed.nickname}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
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
    </>
  );
}

export default FeedDetailItem;
