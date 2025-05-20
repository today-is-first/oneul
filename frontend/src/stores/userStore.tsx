import { create } from "zustand";
import { parseJwt, getCookie } from "@/utils/userUtils";

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

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  accessToken: null,
  setUser: (user, accessToken) => set({ user, accessToken }),
  logout: () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
