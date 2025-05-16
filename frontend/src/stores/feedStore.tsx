import { Feed } from "@/types/Feed";
import { Streak } from "@/types/Streak";
import { create } from "zustand";

interface FeedStore {
  myFeeds: Feed[];
  communityFeeds: Feed[];
  streak: Streak[];
  setMyFeeds: (feeds: Feed[]) => void;
  setCommunityFeeds: (feeds: Feed[]) => void;
  setStreak: (streak: Streak[]) => void;
}

export const useFeedStore = create<FeedStore>((set) => ({
  myFeeds: [],
  communityFeeds: [],
  streak: [],
  setMyFeeds: (feeds) => set({ myFeeds: feeds }),
  setCommunityFeeds: (feeds) => set({ communityFeeds: feeds }),
  setStreak: (streak) => set({ streak }),
}));
