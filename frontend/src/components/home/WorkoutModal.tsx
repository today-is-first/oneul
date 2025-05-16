import { Dialog } from "@components/common/Dialog";
import { WorkoutModalProps } from "@/types/home";
import { useFeedStore } from "@/stores/feedStore";

const WorkoutModal = ({ selectedDate, setSelectedDate }: WorkoutModalProps) => {
  const feeds = useFeedStore((state) => state.myFeeds);
  return (
    <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
      <div className="flex items-center justify-center bg-opacity-60">
        <div className="w-full max-w-sm rounded-xl bg-white p-6 text-black">
          <h3 className="mb-2 text-lg font-semibold">{selectedDate} 피드</h3>
          <ul className="list-inside list-disc space-y-1">
            {selectedDate &&
              feeds
                .filter((feed) => feed.createdAt === selectedDate)
                .map((item, idx) => <li key={idx}>{item.content}</li>)}
          </ul>
          <button
            className="mt-4 rounded bg-neutral-800 px-4 py-2 text-white hover:bg-neutral-700"
            onClick={() => setSelectedDate(null)}
          >
            닫기
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default WorkoutModal;
