import { ApiResponse } from "@/types/ApiResponse";
import { post } from "./api";

export const joinChallenge = async (
  challengeId: number,
  roomPassword?: string,
) => {
  const body: { roomPassword?: string } = roomPassword ? { roomPassword } : {};
  await post<void>(`/challenges/${challengeId}/user`, body);
};

export const validatePassword = async (
  challengeId: number,
  roomPassword?: string,
): Promise<boolean> => {
  const res = await post<ApiResponse<boolean>>(
    `/challenges/${challengeId}/validate-password`,
    { roomPassword },
  );
  return res.data;
};
