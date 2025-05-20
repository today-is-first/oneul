import { Feed } from "@/types/Feed";
import { FaHeart } from "react-icons/fa";

interface CommunityFeedItemProps {
  feed: Feed;
  onClick: () => void;
}

function truncateAndWrapText(
  text: string,
  maxLength: number = 50,
  wrapThreshold: number = 30,
): string {
  if (!text) return "";

  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }

  if (text.length > wrapThreshold) {
    const before = text.slice(0, wrapThreshold);
    const after = text.slice(wrapThreshold);
    return before + "\n" + after;
  }

  return text;
}

function CommunityFeedItem({ feed, onClick }: CommunityFeedItemProps) {
  return (
    <div
      key={feed.id}
      className="min-w-[280px] max-w-[280px] flex-shrink-0 overflow-hidden rounded-lg bg-[#222227] shadow-sm"
      onClick={onClick}
    >
      <img
        src={feed.imageUrl}
        alt="피드 이미지"
        className="h-40 w-full object-cover"
      />
      <div className="flex h-[160px] flex-col justify-between p-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <img
              src={feed.profileImg || "/svgs/default-profile.svg"}
              alt="프로필"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-white">
              {feed.nickname}
            </span>
          </div>
          <p className="line-clamp-2 whitespace-pre-line text-sm text-gray-300">
            {truncateAndWrapText(feed.content)}
          </p>
        </div>
        <div className="mt-3 flex items-center gap-1 text-sm text-purple-400">
          <FaHeart size={14} />
          <span>{feed.likeCount}</span>
        </div>
      </div>
    </div>
  );
}

export default CommunityFeedItem;
