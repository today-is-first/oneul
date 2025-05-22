import { Feed } from "@/types/Feed";
import { useEffect, useRef, useState } from "react";
import FeedDetailItem from "./FeedDetailItem";

function FeedDetailModal({
  isOpen,
  onClose,
  feed,
}: {
  isOpen: boolean;
  onClose: () => void;
  feed: Feed | null;
}) {
  const [showAnimation, setShowAnimation] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowAnimation(true), 10);
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen || !feed) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
    >
      <div
        ref={modalRef}
        className={`min-h-[550px] w-[450px] transform overflow-hidden rounded-2xl border border-white/10 text-white shadow-[0_4px_40px_rgba(0,0,0,0.6)] transition-all duration-300 ${
          showAnimation ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <FeedDetailItem key={feed.id} feed={feed} onClose={onClose} />
      </div>
    </div>
  );
}

export default FeedDetailModal;
