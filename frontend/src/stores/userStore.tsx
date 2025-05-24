import { create } from "zustand";
import { parseJwt, getCookie } from "@/utils/userUtils";
import { User } from "@/types/User";

interface UserStore {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User, accessToken: string) => void;
  logout: () => void;
  initializeFromToken: () => void;
  deleteCookie: (name: string) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setUser: (user, accessToken) => set({ user, accessToken }),
  logout: () => {
    set({ user: null, accessToken: null });
    get().deleteCookie("accessToken");
    get().deleteCookie("refreshToken");
  },
  deleteCookie: (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
  initializeFromToken: () => {
    const token = getCookie("accessToken");
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        const user: User = {
          userId: payload.userId,
          username: payload.userName,
          email: payload.userEmail,
          nickname: payload.userNickname,
          profileImg: payload.userProfile,
          userTel: payload.userTel,
          signupCompleted: payload.signupCompleted,
          createdAt: payload.createdAt,
        };
        set({ user, accessToken: token, isAuthenticated: true });
      } else {
        set({ user: null, accessToken: null, isAuthenticated: false });
      }
    }
  },
}));
