import FeedCreateModal from "./FeedCreateModal";
import { useState } from "react";

function FeedCreateBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-point font-lg text-semibold h-12 w-40 rounded-lg text-white shadow-md transition-all hover:opacity-90"
      >
        오운완 생성
      </button>
      <FeedCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default FeedCreateBtn;
