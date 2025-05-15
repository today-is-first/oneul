import { useState } from "react";
import FeedCheckModal from "./FeedCheckModal";
import FeedCheckHeader from "./FeedCheckHeader";
import FeedCheckList from "./FeedCheckList";
import { Feed } from "@/types/Feed";

export default function FeedCheckTab() {
  const [selected, setSelected] = useState<Feed | null>(null);

  return (
    <div className="flex flex-1 flex-col">
      <FeedCheckHeader />
      {/* 리스트 */}
      <FeedCheckList onFeedSelect={setSelected} />

      {/* 모달 */}
      {selected && (
        <FeedCheckModal
          isOpen={true}
          onClose={() => setSelected(null)}
          feed={selected}
        />
      )}
    </div>
  );
}
