import { useFeedStore } from "@/stores/feedStore";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CommunityFeedItem from "./CommunityFeedItem";
import { Feed } from "@/types/Feed";

const CommunityFeed = ({
  onFeedClick,
}: {
  onFeedClick: (feed: Feed) => void;
}) => {
  const feeds = useFeedStore((state) => state.communityFeeds);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-[1200px] overflow-hidden rounded-lg bg-[#1A1A1E] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        다른 유저들의 인증 피드
      </h2>

      <div className="relative">
        {/* 좌우 버튼 */}
        <button
          onClick={() => scrollBy(-300)}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#2A2A2D] p-2 text-white hover:bg-[#3A3A3D]"
        >
          <IoIosArrowBack size={20} />
        </button>
        <button
          onClick={() => scrollBy(300)}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#2A2A2D] p-2 text-white hover:bg-[#3A3A3D]"
        >
          <IoIosArrowForward size={20} />
        </button>

        {/* 슬라이드 컨테이너 */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex w-full gap-4 overflow-x-auto px-1 py-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {feeds.map((feed) => (
            <CommunityFeedItem
              key={feed.id}
              feed={feed}
              onClick={() => onFeedClick(feed)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityFeed;
