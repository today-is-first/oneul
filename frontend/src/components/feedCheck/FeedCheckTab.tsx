import { useState } from "react";
import FeedCheckModal from "./FeedCheckModal";
import { CheckInLog } from "../challengeDetail/ChallengeFeed";
import FeedCheckHeader from "./FeedCheckHeader";
import FeedCheckList from "./FeedCheckList";

export default function FeedCheckTab() {
  // 목업 데이터 (나중에 API에서 받아온 데이터로 교체)

  const [selected, setSelected] = useState<CheckInLog | null>(null);

  return (
    <div className="flex flex-1 flex-col">
      <FeedCheckHeader />
      {/* 리스트 */}
      <FeedCheckList onLogSelect={setSelected} />

      {/* 모달 */}
      {selected && (
        <FeedCheckModal
          isOpen={true}
          onClose={() => setSelected(null)}
          log={selected}
        />
      )}
    </div>
  );
}
