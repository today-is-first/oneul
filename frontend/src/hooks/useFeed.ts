import { Feed } from "@/types/Feed";
import { useGet, usePatch } from "./useApiHooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { get } from "@/api/api";
import { useUserStore } from "@/stores/userStore";

export function useChallengeFeeds(challengeId: string) {
  return useGet<Feed[]>(
    ["feeds", challengeId],
    `/challenges/${challengeId}/feeds/challenge`,
    {
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 5,
      enabled: Boolean(challengeId),
    },
  );
}

interface UpdateFeedVariables {
  challengeId: number;
  feedId: number;
  content: string;
  imageUrl: string;
  userId: number;
}

export function useUpdateFeed() {
  const queryClient = useQueryClient();

  return usePatch<Feed, UpdateFeedVariables>(
    "", // URL은 mutationFn에서 조립
    {
      mutationFn: async ({ challengeId, feedId, ...body }) => {
        return await fetch(`/challenges/${challengeId}/feeds/${feedId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }).then((res) => res.json());
      },
      onSuccess: (updatedFeed, variables) => {
        const { challengeId } = variables;

        // 캐시 수정 방식 1: 직접 setQueryData로 갱신
        queryClient.setQueryData<Feed[]>(["feeds", challengeId], (oldFeeds) =>
          oldFeeds
            ? oldFeeds.map((feed) =>
                feed.id === updatedFeed.id ? { ...feed, ...updatedFeed } : feed,
              )
            : [],
        );
      },
    },
  );
}

export const useCommunityFeeds = () => {
  const { data: communityFeeds } = useQuery<Feed[]>({
    queryKey: ["communityFeeds"],
    queryFn: () => get("/feeds/community"),
    staleTime: 1000 * 60 * 5,
  });
  return communityFeeds;
};

export const useMyFeeds = () => {
  const { user } = useUserStore();
  const { data: myFeeds } = useQuery<Feed[]>({
    queryKey: ["myFeeds"],
    queryFn: () => get("/feeds/my"),
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });
  return myFeeds;
};
