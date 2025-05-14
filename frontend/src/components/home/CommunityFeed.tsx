// components/CommunityFeed.tsx
import { FaHeart } from "react-icons/fa";

const dummyFeeds = [
  {
    id: 1,
    username: "헬창용팔이",
    profileImg: "https://i.pravatar.cc/50?img=10",
    image: "https://picsum.photos/id/1011/300/200",
    content: "오늘도 하체 불살랐다🔥",
    likeCount: 15,
  },
  {
    id: 2,
    username: "스쿼트요정",
    profileImg: "https://i.pravatar.cc/50?img=11",
    image: "https://picsum.photos/id/1012/300/200",
    content: "스쿼트 100개 성공!",
    likeCount: 23,
  },
  {
    id: 3,
    username: "피티쌤짱",
    profileImg: "https://i.pravatar.cc/50?img=12",
    image: "https://picsum.photos/id/1013/300/200",
    content: "어깨 불태웠어요 🔥",
    likeCount: 9,
  },
];

const CommunityFeed = () => {
  return (
    <div className="rounded-lg bg-neutral-800 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        다른 유저들의 인증 피드
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dummyFeeds.map((feed) => (
          <div
            key={feed.id}
            className="overflow-hidden rounded-lg bg-neutral-700 shadow-sm transition hover:shadow-md"
          >
            <img
              src={feed.image}
              alt="피드 이미지"
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <div className="mb-2 flex items-center gap-2">
                <img
                  src={feed.profileImg}
                  alt="프로필"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-white">
                  {feed.username}
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
