import { useUserStore } from "@/stores/userStore";
import { useNavigate } from "react-router-dom";

export function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
  return null;
}

export function useTokenValidator() {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const validateToken = () => {
    const token = getCookie("accessToken");
    if (!token) return;

    const payload = parseJwt(token);
    if (!payload || !payload.exp) return;

    const now = Math.floor(Date.now() / 1000); // 현재 시각(초)
    if (payload.exp < now) {
      console.log("🔐 Token expired, logging out");
      document.cookie = "accessToken=; Max-Age=0"; // 쿠키 제거
      userStore.logout(); // 전역 상태 초기화
      navigate("/login"); // 로그인 페이지로 이동
    }
  };

  return { validateToken };
}
