import { Dialog } from "@components/common/Dialog";
import { WorkoutModalProps } from "@/types/home";
import { useFeedStore } from "@/stores/feedStore";
import { isSameDate } from "@/utils/date";
import FeedDetailItem from "@/components/feed/FeedDetailItem";
import { useRef } from "react";

const WorkoutModal = ({ selectedDate, setSelectedDate }: WorkoutModalProps) => {
  const feeds = useFeedStore((state) => state.myFeeds);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setSelectedDate(null);
    }
  };
  return (
    <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
        onClick={handleBackgroundClick}
      >
        <div
          ref={modalRef}
          className="max-h-[80vh] w-[450px] transform overflow-y-auto rounded-2xl text-white shadow-[0_4px_40px_rgba(0,0,0,0.6)] transition-all duration-300"
        >
          <ul className="list-inside list-disc space-y-20">
            {selectedDate &&
              feeds
                .filter((feed) => isSameDate(feed.createdAt, selectedDate))
                .map((item, idx) => (
                  <li key={idx} className="list-none">
                    <FeedDetailItem key={idx} feed={item} onClose={() => {}} />
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </Dialog>
  );
};

export default WorkoutModal;
