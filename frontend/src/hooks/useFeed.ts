import { CheckStatus, Feed } from "@/types/Feed";
import { useGet, usePatch, usePost } from "./useApiHooks";
import { useQueryClient } from "@tanstack/react-query";
import { patch, post } from "@/api/api";
import axios from "axios";

export function useChallengeFeeds(challengeId: string) {
  return useGet<Feed[]>(
    ["feeds", challengeId],
    `/challenges/${challengeId}/feeds/challenge`,
    {
      staleTime: 0,
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

interface CreateFeedVariables {
  challengeId: number;
  content: string;
  imageUrl: string;
  userId: number;
}

export function useCreateFeed() {
  const queryClient = useQueryClient();
  return usePost<Feed, CreateFeedVariables>("", {
    mutationFn: async ({ challengeId, ...body }) => {
      return await post(`/challenges/${challengeId}/feeds`, body);
    },
    onSuccess: (createdFeed, variables) => {
      const { challengeId } = variables;

      queryClient.setQueryData<Feed[]>(["feeds", challengeId], (oldFeeds) =>
        oldFeeds ? [...oldFeeds, createdFeed] : [createdFeed],
      );
    },
  });
}

export interface EvaluateFeedVariables {
  challengeId: string;
  feedId: number;
  checkStatus: CheckStatus;
}

export function useEvaluateFeed() {
  const qc = useQueryClient();
  return usePatch<Feed, EvaluateFeedVariables>("", {
    mutationFn: async ({ challengeId, feedId, checkStatus }) =>
      patch<Feed>(`/challenges/${challengeId}/feeds/${feedId}/checks`, {
        checkStatus,
      }),
    onSuccess: (feed, { challengeId }) => {
      qc.setQueryData<Feed[]>(
        ["feeds", challengeId],
        (oldFeeds) => oldFeeds?.map((f) => (f.id === feed.id ? feed : f)) ?? [],
      );
    },
  });
}
