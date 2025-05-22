import { useUserStore } from "@/stores/userStore";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // HttpOnly 쿠키(refreshToken) 자동 포함
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터 (토큰 자동 주입)
api.interceptors.request.use((config) => {
  const accessToken = useUserStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  (res) => {
    // 백엔드 필터가 새 토큰을 Authorization 헤더에 담아 내려주면
    const newToken = res.headers["authorization"] as string | undefined;
    if (newToken?.startsWith("Bearer ")) {
      useUserStore
        .getState()
        .setUser(
          useUserStore.getState().user!,
          newToken.replace("Bearer ", ""),
        );
    }
    return res;
  },
  (err) => Promise.reject(err),
);

// 공통 메서드 정의
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const res: AxiosResponse<T> = await api.get(url, config);
  return res.data;
};

export const post = async <T>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const res: AxiosResponse<T> = await api.post(url, body, config);
  return res.data;
};

export const put = async <T>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const res: AxiosResponse<T> = await api.put(url, body, config);
  return res.data;
};

export const patch = async <T>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const res: AxiosResponse<T> = await api.patch(url, body, config);
  return res.data;
};

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const res: AxiosResponse<T> = await api.delete(url, config);
  return res.data;
};
