export interface OrderIdResponse {
  orderId: string;
}

export interface ConfirmPaymentRequest {
  challengeId: number;
  orderId: string;
  paymentKey: string;
  amount: number;
}

export interface Amount {
  currency: "KRW";
  value: number;
}
