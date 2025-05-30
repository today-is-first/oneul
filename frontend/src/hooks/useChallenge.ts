// src/hooks/useChallenge.ts
import { Challenge } from "@/types/Challenge";
import { useGet, useMutationHook } from "./useApiHooks";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { joinChallenge } from "@/api/challenge";

/** 챌린지 정보 호출 */
// 내가 가입한 챌린지의 정보
export function useMyChallenge(challengeId: string) {
  const query = useGet<Challenge, AxiosError>(
    ["myChallenge", challengeId],
    `/challenges/my/${challengeId}`,
    {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      enabled: Boolean(challengeId),
    },
  );

  const statusCode = query.error?.response?.status;

  return {
    ...query,
    statusCode,
  };
}

// 가입 유무 상관 없이 가져오는 챌린지 정보
export function useChallenge(challengeId: string) {
  return useGet<Challenge>(
    ["challenge", challengeId],
    `/challenges/${challengeId}`,
    {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      enabled: Boolean(challengeId),
    },
  );
}

interface JoinVariables {
  challengeId: number;
  roomPassword?: string;
}
/** 챌린지 가입 */
export function useJoinChallenge() {
  const queryClient = useQueryClient();

  return useMutationHook<void, JoinVariables, AxiosError>(
    ({ challengeId, roomPassword }) => joinChallenge(challengeId, roomPassword),

    {
      onSuccess: async (_data, variables) => {
        await queryClient.refetchQueries({
          queryKey: ["subscribedChallengeList"],
          exact: true,
          stale: false,
        });
        await queryClient.refetchQueries({
          queryKey: ["communityChallengeList"],
          exact: true,
          stale: false,
        });
      },
      onError: (error, variables) => {
        if (error.response?.status === 409) {
          console.log("이미 참여 중인 챌린지입니다.");
        } else {
          console.log("서버 오류가 발생했습니다. 다시 시도해주세요.");
        }
      },
    },
  );
}
