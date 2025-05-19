import { Challenge } from "@/types/Challenge";
import { create } from "zustand";

interface ChallengeStore {
  challengeMap: Record<number, Challenge>;
  subscribedChallengeList: Challenge[];
  setSubscribedChallengeList: (challengeList: Challenge[]) => void;
  setChallenges: (challengeList: Challenge[]) => void;
  getChallenge: (challengeId: number) => Challenge | undefined;
  communityChallengeList: Challenge[];
  setCommunityChallengeList: (challengeList: Challenge[]) => void;
}

export const useChallengeStore = create<ChallengeStore>((set, get) => ({
  challengeMap: {},
  subscribedChallengeList: [],
  communityChallengeList: [],

  setChallenges: (challengeList: Challenge[]) =>
    set((state) => ({
      challengeMap: {
        ...state.challengeMap,
        ...challengeList.reduce<Record<number, Challenge>>((acc, curr) => {
          acc[curr.challengeId] = curr;
          return acc;
        }, {}),
      },
    })),

  getChallenge: (challengeId: number) => get().challengeMap[challengeId],

  setCommunityChallengeList: (challengeList: Challenge[]) =>
    set((state) => ({
      communityChallengeList: challengeList,
    })),

  setSubscribedChallengeList: (challengeList: Challenge[]) =>
    set((state) => ({
      subscribedChallengeList: challengeList,
    })),
}));
