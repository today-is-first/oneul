import FeedCreateModal from "./FeedCreateModal";
import { useState } from "react";

function FeedCreateBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-primary-purple-200 rounded-lg px-4 py-2 text-sm text-white shadow-md transition-all hover:opacity-90"
      >
        작성하기
      </button>
      <FeedCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default FeedCreateBtn;
