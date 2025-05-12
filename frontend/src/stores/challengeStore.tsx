import { Challenge } from "@/api/challenge";
import { create } from "zustand";

interface ChallengeStore {
  challengeMap: Record<number, Challenge>;
  setChallenges: (challengeList: Challenge[]) => void;
  getChallenge: (challengeId: number) => Challenge | undefined;
}

export const useChallengeStore = create<ChallengeStore>((set, get) => ({
  challengeMap: {},

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
}));
