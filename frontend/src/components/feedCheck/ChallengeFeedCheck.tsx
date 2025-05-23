import { useChallengeFeeds } from "@/hooks/useFeed";
import { ChallengeStatusType } from "@/types/Challenge";
import { Feed } from "@/types/Feed";
import { useMemo, useState } from "react";
import { useParams } from "react-router";
import FeedCheckItem from "./FeedCheckItem";
import { formatTimeAgo } from "@/utils/date";

interface ChallengeFeedCheckProps {
  status: ChallengeStatusType;
}

function ChallengeFeedCheck({ status }: ChallengeFeedCheckProps) {
  const { challengeId } = useParams<{ challengeId: string }>();
  const {
    data: feeds,
    isLoading,
    isError,
    error,
  } = useChallengeFeeds(challengeId ?? "");

  const [selectedFeed, setSelectedFeed] = useState<Feed | null>(null);
  const [filter, setFilter] = useState<
    "ALL" | "PENDING" | "APPROVED" | "REJECTED"
  >("ALL");
  const [sortKey, setSortKey] = useState<"DATE" | "UPDATED">("DATE");

  const filtered = useMemo(() => {
    if (!feeds) return [];
    if (filter === "ALL") return feeds;
    return feeds.filter((f) => f.checkStatus === filter);
  }, [feeds, filter]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aKey = sortKey === "DATE" ? a.createdAt : a.updatedAt;
      const bKey = sortKey === "DATE" ? b.createdAt : b.updatedAt;
      return new Date(bKey).getTime() - new Date(aKey).getTime();
    });
  }, [filtered, sortKey]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-white">
        로딩 중
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center text-red-400">
        에러: {(error as Error).message}
      </div>
    );
  }

  return (
    <section className="flex h-[800px] w-full gap-6 rounded-2xl bg-[#1A1A1F] px-8 py-10">
      {/* 왼쪽: 선택된 피드 크게 */}
      <div className="flex-1 bg-[#1A1A1F]">
        <span className="mb-6 inline-block text-xl font-semibold text-gray-200">
          챌린지 승인
        </span>
        {selectedFeed ? (
          <div className="flex h-full flex-col gap-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedFeed.profileImg || "/svgs/default-profile.svg"}
                  alt={selectedFeed.nickname}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-gray-200">{selectedFeed.nickname}</span>
                  <span className="text-sm text-gray-400">
                    {formatTimeAgo(selectedFeed.updatedAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <select
                  value={selectedFeed.checkStatus}
                  onChange={() => {}}
                  className="focus:border-primary-purple-200 w-32 rounded-lg border border-gray-700 bg-[#2A2A2D] px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
                >
                  <option value="APPROVED">승인</option>
                  <option value="REJECTED">거절</option>
                </select>
                <button className="bg-primary-purple-200 ml-2 cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50">
                  확인
                </button>
              </div>
            </div>
            <div className="flex max-h-[620px] flex-col gap-4 overflow-y-scroll">
              <img
                src={selectedFeed.imageUrl}
                alt="feed img"
                className="w-full rounded-lg object-cover"
              />
              <p className="mb-4 whitespace-pre-wrap text-sm text-gray-300">
                {selectedFeed.content}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            피드를 선택해주세요.
          </div>
        )}
      </div>

      {/* 오른쪽: 필터/소트 + 리스트 */}
      <div className="flex w-80 flex-col gap-2">
        {/* 필터 & 소트 */}
        <div className="mb-4 h-[60px] space-y-2">
          <div className="flex flex-wrap gap-2">
            {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setSelectedFeed(null);
                }}
                className={`rounded-lg px-3 py-1 text-sm font-medium ${
                  filter === f
                    ? "bg-gray-400 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {f === "ALL"
                  ? "전체"
                  : f === "PENDING"
                    ? "대기"
                    : f === "APPROVED"
                      ? "승인"
                      : "거절"}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {(["DATE", "UPDATED"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortKey(s)}
                className={`rounded-lg px-3 py-1 text-sm font-medium ${
                  sortKey === s
                    ? "bg-gray-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {s === "DATE" ? "날짜순" : "업데이트순"}
              </button>
            ))}
          </div>
        </div>

        {/* 피드 리스트 */}
        <div className="flex-1 space-y-2 overflow-y-auto bg-[#1A1A1F]">
          {sorted.length > 0 ? (
            sorted.map((feed) => (
              <FeedCheckItem
                onClick={() => setSelectedFeed(feed)}
                feed={feed}
              />
            ))
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-gray-500">
                표시할 피드가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ChallengeFeedCheck;
