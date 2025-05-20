import { useMemo, useState } from "react";
import MateFeedList from "../feed/MateFeedList";
import MyFeedCard from "../feed/MyFeedCard";
import FeedDetailModal from "@/components/feed/FeedDetailModal";
import FeedCreateModal from "@/components/feed/FeedCreateModal";
import FeedUpdateModal from "@/components/feed/FeedUpdateModal";
import { useUserStore } from "@/stores/userStore";
import FeedCreateBtn from "@/components/feed/FeedCreateBtn";
import { useParams } from "react-router";
import { useChallengeFeeds } from "@/hooks/useFeed";
import { Feed } from "@/types/Feed";
import { useQueryClient } from "@tanstack/react-query";

type ModalState =
  | { kind: "create" }
  | { kind: "edit"; feed: Feed }
  | { kind: "detail"; feed: Feed }
  | null;

function ChallengeFeed() {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [modalState, setModalState] = useState<ModalState>(null);

  const queryClient = useQueryClient();
  const {
    data: feeds,
    isLoading,
    isError,
    error,
  } = useChallengeFeeds(challengeId ?? "");

  const { user } = useUserStore();
  const myFeed = useMemo(
    () => feeds?.find((feed) => feed.userId === user?.id) ?? null,
    [feeds, user?.id],
  );

  const invalidateFeeds = () => {
    queryClient.invalidateQueries({
      queryKey: ["feeds", challengeId],
    });
  };

  if (!challengeId) return <p>잘못된 경로입니다.</p>;
  // 로딩 또는 에러시
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        로딩 중
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center text-red-400">
        에러: {(error as Error).message}
      </div>
    );
  }

  const openCreate = () => setModalState({ kind: "create" });
  const openEdit = (feed: Feed) => setModalState({ kind: "edit", feed });
  const openDetail = (feed: Feed) => setModalState({ kind: "detail", feed });
  const closeAll = () => setModalState(null);

  return (
    <section className="flex w-full flex-col gap-3 rounded-2xl bg-[#1A1A1F] px-8 py-9">
      <div className="flex items-center gap-4">
        <span className="text-center text-xl font-semibold text-gray-200">
          챌린지 피드
        </span>
        <FeedCreateBtn />
      </div>
      <div className="flex gap-6">
        <div className="flex-1">
          <MyFeedCard
            feed={myFeed}
            onCreate={openCreate}
            onEdit={openEdit}
            onDetail={openDetail}
          />
        </div>

        <div className="flex max-h-[560px] flex-1 flex-col gap-1">
          <h2 className="mb-3 text-base font-semibold text-gray-300">
            챌린지 메이트 인증 현황
          </h2>
          {feeds ? (
            <MateFeedList feeds={feeds} onItemClick={openDetail} />
          ) : (
            <p>피드 데이터를 불러오는데 실패했습니다.</p>
          )}
        </div>
      </div>

      {/* --- 모달 분기 --- */}
      {modalState?.kind === "create" && (
        <FeedCreateModal isOpen onClose={closeAll} onCreate={invalidateFeeds} />
      )}

      {modalState?.kind === "edit" && myFeed && (
        <FeedUpdateModal
          isOpen
          onClose={closeAll}
          initialData={myFeed}
          onUpdate={invalidateFeeds}
        />
      )}

      {modalState?.kind === "detail" && (
        <FeedDetailModal isOpen onClose={closeAll} feed={modalState.feed} />
      )}
    </section>
  );
}

export default ChallengeFeed;
