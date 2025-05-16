// components/CommunityFeed.tsx
import { FaHeart } from "react-icons/fa";
import { useFeedStore } from "@/stores/feedStore";

const CommunityFeed = () => {
  const feeds = useFeedStore((state) => state.communityFeeds);

  return (
    <div className="rounded-lg bg-[#1A1A1E] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        다른 유저들의 인증 피드
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {feeds.map((feed) => (
          <div
            key={feed.id}
            className="overflow-hidden rounded-lg bg-[#222227] shadow-sm transition hover:shadow-md"
          >
            <img
              src={feed.imageUrl}
              alt="피드 이미지"
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
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
              <p className="line-clamp-2 text-sm text-gray-300">
                {feed.content}
              </p>
              <div className="mt-3 flex items-center gap-1 text-sm text-purple-400">
                <FaHeart size={14} />
                <span>{feed.likeCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
