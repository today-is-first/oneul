import { post } from "./api";

export const joinChallenge = async (
  challengeId: number,
  roomPassword?: string,
) => {
  const body: { roomPassword?: string } = roomPassword ? { roomPassword } : {};
  await post<void>(`/challenges/${challengeId}/user`, body);
};
