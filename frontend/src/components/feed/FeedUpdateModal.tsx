import { useEffect, useRef, useState } from "react";
import { Feed } from "@/types/Feed";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";
import { debounce } from "lodash";

interface FeedUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Feed;
  onUpdate: () => void;
}

function FeedUpdateModal({
  isOpen,
  onClose,
  initialData,
  onUpdate,
}: FeedUpdateModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const previewUrlRef = useRef(previewUrl);
  const contentRef = useRef(content);
  const imageFileRef = useRef(imageFile);

  useEffect(() => {
    previewUrlRef.current = previewUrl;
    contentRef.current = content;
    imageFileRef.current = imageFile;
  }, [previewUrl, content, imageFile]);

  useEffect(() => {
    if (isOpen) {
      setPreviewUrl(initialData.imageUrl);
      setContent(initialData.content);
      setImageFile(null);
      setTimeout(() => setShowAnimation(true), 10);
    } else {
      setShowAnimation(false);
    }
  }, [isOpen, initialData]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : initialData.imageUrl);
  };

  const handleUpdate = async () => {
    if (!previewUrlRef.current || !contentRef.current.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }

    const accessToken = useUserStore.getState().accessToken;
    const userId = useUserStore.getState().user?.id;
    const challengeId = initialData.challengeId;

    try {
      let finalImageUrl = initialData.imageUrl;

      if (imageFileRef.current) {
        // 이미지가 바뀐 경우에만 presigned URL 업로드
        const presignRes = await axios.post(
          `${import.meta.env.VITE_API_URL}/presigned/upload`,
          {
            filename: imageFileRef.current.name,
            contentType: imageFileRef.current.type,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          },
        );

        const { presignedUrl, objectKey } = presignRes.data;

        await axios.put(presignedUrl, imageFileRef.current, {
          headers: {
            "Content-Type": imageFileRef.current.type,
          },
        });

        finalImageUrl = objectKey;

        // 서버에 최종 데이터 패치
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/challenges/${challengeId}/feeds/${initialData.id}`,
          {
            content: contentRef.current,
            imageUrl: finalImageUrl,
            userId,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
      } else {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/challenges/${challengeId}/feeds/${initialData.id}/content`,
          {
            content: contentRef.current,
          },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );
      }

      onUpdate();
      setImageFile(null);
      setPreviewUrl(null);
      setContent("");
      onClose();
    } catch (err) {
      console.error(err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  const debouncedUpdate = useRef(debounce(handleUpdate, 500)).current;

  if (!isOpen || !initialData) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        ref={modalRef}
        className={`w-[400px] transform rounded-2xl bg-[#1B1B1E] p-8 text-white transition-all duration-300 ${
          showAnimation ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.2)",
        }}
      >
        <h2 className="mb-6 text-xl font-bold">피드 수정</h2>

        {/* 이미지 미리보기 */}
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
            className="w-1/3 cursor-pointer rounded-full bg-gray-600 py-2 text-sm font-bold hover:opacity-80"
          >
            취소
          </button>
          <button
            onClick={debouncedUpdate}
            className="bg-point w-1/2 cursor-pointer rounded-full py-2 text-sm font-bold text-white hover:opacity-90"
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedUpdateModal;
