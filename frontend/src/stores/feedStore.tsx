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
  setInitFeedStore: () => void;
}

export const useFeedStore = create<FeedStore>((set) => ({
  myFeeds: [],
  communityFeeds: [],
  streak: [],
  setMyFeeds: (feeds) => {
    console.log("🟣 setting my list", feeds);
    set({ myFeeds: [...feeds] });
  },
  setCommunityFeeds: (feeds) => {
    console.log("🟣 setting community list", feeds);
    set({ communityFeeds: [...feeds] });
  },
  setStreak: (streak) => {
    console.log("🟣 setting streak", streak);
    set({ streak: [...streak] });
  },
  setInitFeedStore: () => set({ myFeeds: [], streak: [] }),
}));
