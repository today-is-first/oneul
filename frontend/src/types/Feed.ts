export type CheckStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Feed {
  id: number;
  userId: number;
  nickname: string;
  challengeId: number;
  imageUrl: string;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  checkStatus: CheckStatus;
  checkedAt: string | null;
}
