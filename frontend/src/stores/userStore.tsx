import { create } from "zustand";
import { parseJwt, getCookie } from "@/utils/userUtils";
import { get } from "@/api/api";

interface User {
  id: number;
  name: string;
  email: string;
  nickname: string;
  profile: string;
}

interface UserStore {
  user: User | null;
  accessToken: string | null;
  setUser: (user: User, accessToken: string) => void;
  logout: () => void;
  initializeFromToken: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  accessToken: null,
  setUser: (user, accessToken) => set({ user, accessToken }),
  logout: () => {
    set({ user: null, accessToken: null });
  },
  initializeFromToken: () => {
    const token = getCookie("accessToken");
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        const user: User = {
          id: payload.userId,
          nickname: payload.userNickname,
          name: payload.userName,
          email: payload.userEmail,
          profile: payload.userProfile,
        };
        set({ user, accessToken: token });
      } else {
        set({ user: null, accessToken: null });
      }
    }
  },
}));
