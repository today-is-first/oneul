import { useEffect, useRef, useState } from "react";

function FeedCreateModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowAnimation(true), 10); // 열릴 때 부드럽게
    } else {
      setShowAnimation(false);
    }
  }, [isOpen]);

  // 모달 바깥 클릭 시 닫기
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    if (!image || !content) {
      alert("이미지와 내용을 모두 입력해주세요.");
      return;
    }

    // API 요청 보내는 부분 (여기 추가)
    console.log("이미지:", image);
    console.log("내용:", content);

    // 등록 완료 후 초기화 + 모달 닫기
    setImage(null);
    setPreviewUrl(null);
    setContent("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        ref={modalRef}
        className={`text-logo-white w-[400px] transform rounded-2xl p-8 transition-all duration-300 ${
          showAnimation ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 className="mb-6 text-xl font-bold">피드 작성</h2>

        {/* 이미지 업로드 */}
        <div className="mb-4">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="mb-2 h-48 w-full rounded-lg object-cover"
            />
          ) : (
            <div className="mb-2 flex h-48 w-full items-center justify-center rounded-lg bg-[#2A2A2D]">
              <span className="text-gray-400">이미지를 업로드하세요</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file:bg-point hover:file:bg-point-dark w-full text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:px-4 file:py-2 file:text-sm file:font-semibold"
          />
        </div>

        {/* 내용 입력 */}
        <div className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            className="focus:ring-point h-32 w-full resize-none rounded-lg border border-[#333] bg-[#1B1B1E] p-3 focus:outline-none focus:ring-2"
          />
        </div>

        {/* 버튼 */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="w-1/3 rounded-full bg-gray-600 py-2 text-sm font-bold hover:opacity-80"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="bg-point w-1/2 rounded-full py-2 text-sm font-bold text-white hover:opacity-90"
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedCreateModal;
