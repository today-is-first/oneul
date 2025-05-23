import { ReceiptDto } from "@/types/Receipt";

export function toReceiptDto(row: {
  id: number;
  challenge_name: string;
  updated_at: string;
  amount: number;
  status: "PAID" | "CANCELED";
  method: "CARD" | "BANK_TRANSFER" | "KAKAO_PAY" | "TOSS" | "ETC";
}): ReceiptDto {
  return {
    id: row.id,
    name: row.challenge_name,
    updatedAt: row.updated_at,
    amount: row.amount,
    status: row.status === "PAID" ? "승인" : "실패",
    method: {
      CARD: "카드",
      BANK_TRANSFER: "계좌이체",
      KAKAO_PAY: "카카오페이",
      TOSS: "토스",
      ETC: "기타",
    }[row.method] as "카드" | "계좌이체" | "카카오페이" | "토스" | "기타",
  };
}
