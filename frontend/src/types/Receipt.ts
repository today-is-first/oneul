export interface ReceiptDto {
  id: number; // payment id
  name: string; // 챌린지 이름
  updatedAt: string; // ISO 8601 형식
  amount: number;
  status: "승인" | "실패";
  method: "카드" | "계좌이체" | "카카오페이" | "토스" | "기타";
}
