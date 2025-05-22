import FeedDetailModal from "@/components/feed/FeedDetailModal";
import FeedList from "@/components/home/FeedList";
import { Feed } from "@/types/Feed";
import { useState } from "react";

function MyFeedList() {
  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleDetailFeed = (feed: Feed) => {
    setSelectedFeed(feed);
    setIsDetailModalOpen(true);
  };
  return (
    <div className="flex justify-center bg-[#0E0E11] px-4 py-10 text-white">
      <div className="flex w-full max-w-6xl flex-col gap-8">
        <FeedDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          feed={selectedFeed}
        />
        <FeedList onFeedClick={handleDetailFeed} feedType="my" />
      </div>
    </div>
  );
}

export default MyFeedList;
