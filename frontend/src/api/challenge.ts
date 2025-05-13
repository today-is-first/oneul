import { get } from "@/api/api";

export interface Challenge {
  challengeId: number;
  name: string;
  ownerId: number;
  ownerNickname: string;
  categoryId: number;
  description: string;
  startDate: string;
  endDate: string;
  totalDay: number;
  goalDay: number;
  entryFee: number;
  isChallenge: boolean;
  isPublic: boolean;
  createdAt: string;
  successDay: number; // 삭제 예정
  roomPassword: string; // 삭제 예정
}

export const fetchChallengeList = () => get<Challenge[]>("/challenges");
