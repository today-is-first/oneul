import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/stores/userStore";
import { useChallengeStore } from "@/stores/challengeStore";
import { debounce } from "lodash";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateFeed } from "@/hooks/useFeed";

function FeedCreateModal({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}) {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [selectedChallengeId, setSelectedChallengeId] = useState<number | null>(
    null,
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const { subscribedChallengeList } = useChallengeStore();

  const previewUrlRef = useRef(previewUrl);
  const contentRef = useRef(content);
  const imageRef = useRef(image);
  const selectedChallengeIdRef = useRef(selectedChallengeId);

  const createFeed = useCreateFeed();
  const queryClient = useQueryClient();

  useEffect(() => {
    previewUrlRef.current = previewUrl;
    contentRef.current = content;
    imageRef.current = image;
    selectedChallengeIdRef.current = selectedChallengeId;
  }, [previewUrl, content, image, selectedChallengeId]);

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

  const handleSubmit = async () => {
    if (
      !imageRef.current ||
      !contentRef.current.trim() ||
      !selectedChallengeIdRef.current
    ) {
      alert("이미지와 내용 및 챌린지를 모두 입력해주세요.");
      return;
    }

    const accessToken = useUserStore.getState().accessToken;
    const userId = useUserStore.getState().user?.id;

    const presignRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/presigned/upload`,
      {
        filename: imageRef.current.name,
        contentType: imageRef.current.type,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const { presignedUrl, objectKey } = presignRes.data;

    await axios.put(presignedUrl, imageRef.current, {
      headers: {
        "Content-Type": imageRef.current.type,
      },
    });

    createFeed.mutate(
      {
        challengeId: selectedChallengeIdRef.current,
        content: contentRef.current,
        imageUrl: objectKey,
        userId: userId!,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([
            "feeds",
            selectedChallengeIdRef.current,
          ]);
          onCreate(); // 외부 캐시 무효화 (추가적인 리스트 조회 invalidate)
          setImage(null);
          setPreviewUrl(null);
          setContent("");
          onClose();
        },
        onError: () => {
          alert("피드 등록 중 오류가 발생했습니다.");
        },
      },
    );
  };

  const debouncedSubmit = useRef(debounce(handleSubmit, 500)).current;

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        ref={modalRef}
        className={`bg-background text-logo-white w-[400px] transform rounded-2xl p-8 transition-all duration-300 ${
          showAnimation ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        style={{
          boxShadow:
            "0 0 4px rgba(255, 255, 255, 0.1), 0 0 2px rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">피드 작성</h2>
          <select
            className="rounded border border-[#444] bg-[#2A2A2D] p-1 text-sm text-white"
            value={selectedChallengeId ?? ""}
            onChange={(e) => setSelectedChallengeId(Number(e.target.value))}
          >
            <option value="" disabled>
              챌린지 선택
            </option>
            {subscribedChallengeList.map((c) => (
              <option key={c.challengeId} value={c.challengeId}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

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
            onClick={debouncedSubmit}
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
