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
  challenge: boolean;
  public: boolean;
  createdAt: string;
  successDay?: number; // 삭제 예정
  roomPassword: string; // 삭제 예정
  memberCount: number;
  challengeStatus: ChallengeStatusType;
  participantCount?: number;
}

export type ChallengeStatusType = "RECRUITING" | "ENDED" | "IN_PROGRESS";
