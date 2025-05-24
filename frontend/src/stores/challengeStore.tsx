import { Challenge } from "@/types/Challenge";
import { create } from "zustand";

interface ChallengeStore {
  challengeMap: Record<number, Challenge>;
  subscribedChallengeList: Challenge[];
  communityChallengeList: Challenge[];
  myChallengeList: Challenge[];
  setSubscribedChallengeList: (challengeList: Challenge[]) => void;
  setCommunityChallengeList: (challengeList: Challenge[]) => void;
  setMyChallengeList: (challengeList: Challenge[]) => void;
  setChallenges: (challengeList: Challenge[]) => void;
  getChallenge: (challengeId: number) => Challenge | undefined;
  setInitChallengeStore: () => void;
}

export const useChallengeStore = create<ChallengeStore>((set, get) => ({
  challengeMap: {},
  subscribedChallengeList: [],
  communityChallengeList: [],
  myChallengeList: [],

  setInitChallengeStore: () => {
    set({
      challengeMap: {},
      subscribedChallengeList: [],
      communityChallengeList: [],
      myChallengeList: [],
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

  setMyChallengeList: (challengeList: Challenge[]) =>
    set((state) => ({
      myChallengeList: challengeList,
    })),

  setCommunityChallengeList: (challengeList: Challenge[]) =>
    set((state) => {
      console.log("🟣 setting community list", challengeList);
      return {
        communityChallengeList: challengeList,
      };
    }),

  setSubscribedChallengeList: (challengeList: Challenge[]) =>
    set((state) => {
      console.log("🟣 setting subscribed list", challengeList);
      return {
        subscribedChallengeList: challengeList,
      };
    }),
}));
