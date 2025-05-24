// src/hooks/useChallenge.ts
import { Challenge } from "@/types/Challenge";
import { useGet, useMutationHook } from "./useApiHooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { joinChallenge } from "@/api/challenge";
import { get } from "@/api/api";
import { useUserStore } from "@/stores/userStore";

/** 챌린지 정보 호출 */
// 내가 가입한 챌린지의 정보
export function useMyChallenge(challengeId: string) {
  return useGet<Challenge>(
    ["myChallenge", challengeId],
    `/challenges/my/${challengeId}`,
    {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      enabled: Boolean(challengeId),
    },
  );
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
        // queryClient.invalidateQueries({
        //   queryKey: ["subscribedChallengeList", "communityChallengeList"], // 내가 가입한 챌린지 리스트 stale 처리
        // });
        // console.log("챌린지 참여 완료");
        await queryClient.refetchQueries({
          queryKey: ["subscribedChallengeList"],
          exact: true, // 정확히 이 키만
          stale: false, // (선택) refetch 이후에도 stale 상태로 남지 않게
        });
        await queryClient.refetchQueries({
          queryKey: ["communityChallengeList"],
          exact: true, // 정확히 이 키만
          stale: false, // (선택) refetch 이후에도 stale 상태로 남지 않게
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

export const useCommunityChallengeList = () => {
  const { data: communityChallengeList } = useQuery<Challenge[]>({
    queryKey: ["communityChallengeList"],
    queryFn: () => get("/challenges/community"),
    staleTime: 1000 * 60 * 5,
  });
  return communityChallengeList;
};

export const useSubscribedChallengeList = () => {
  const { user } = useUserStore();
  const { data: subscribedChallengeList } = useQuery<Challenge[]>({
    queryKey: ["subscribedChallengeList"],
    queryFn: () => get("/challenges/subscribed"),
    staleTime: 1000 * 60 * 5,
    enabled: !!user,
  });
  return subscribedChallengeList;
};
