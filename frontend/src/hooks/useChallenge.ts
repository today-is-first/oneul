// src/hooks/useChallenge.ts
import { Challenge } from "@/types/Challenge";
import { useGet } from "./useApiHooks";

// 챌린지 정보 호출
export function useChallenge(challengeId: string) {
  return useGet<Challenge>(
    ["challenge", challengeId],
    `/challenges/${challengeId}`,
    { staleTime: 1000 * 60 * 5 },
  );
}
