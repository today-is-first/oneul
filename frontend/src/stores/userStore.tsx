import { create } from "zustand";

interface User {
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

function parseJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
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
    function getCookie(name: string): string | null {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
      return null;
    }
    const token = getCookie("accessToken");
    if (token) {
      const payload = parseJwt(token);
      if (payload) {
        const user: User = {
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
