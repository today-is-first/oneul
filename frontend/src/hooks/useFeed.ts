import { Feed } from "@/types/Feed";
import { useGet } from "./useApiHooks";

export function useChallengeFeeds(challengeId: string) {
  return useGet<Feed[]>(
    ["feeds", challengeId],
    `/challenges/${challengeId}/feeds`,
    {
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 5,
      enabled: Boolean(challengeId),
    },
  );
}
