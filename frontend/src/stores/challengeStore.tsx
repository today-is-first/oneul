import { Challenge } from "@/types/Challenge";
import { create } from "zustand";

interface ChallengeStore {
  challengeMap: Record<number, Challenge>;
  subscribedChallengeList: Challenge[];
  communityChallengeList: Challenge[];

  setSubscribedChallengeList: (challengeList: Challenge[]) => void;
  setCommunityChallengeList: (challengeList: Challenge[]) => void;
  setChallenges: (challengeList: Challenge[]) => void;
  getChallenge: (challengeId: number) => Challenge | undefined;
  setInitChallengeStore: () => void;
}

export const useChallengeStore = create<ChallengeStore>((set, get) => ({
  challengeMap: {},
  subscribedChallengeList: [],
  communityChallengeList: [],

  setInitChallengeStore: () => {
    set({
      challengeMap: {},
      subscribedChallengeList: [],
      communityChallengeList: [],
    });
  },

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
