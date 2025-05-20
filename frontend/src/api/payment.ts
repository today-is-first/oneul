import { get } from "@/api/api";

export interface OrderIdResponse {
  orderId: string;
}

/**
 * 주어진 challengeId로 orderId만 반환받는 API 함수
 */
export const getOrderId = async (
  challengeId: string,
): Promise<OrderIdResponse> => {
  return get<OrderIdResponse>(`/payments/order/${challengeId}`);
};
