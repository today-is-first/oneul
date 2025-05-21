import { ConfirmPaymentRequest } from "@/types/Payment";
import { usePost } from "./useApiHooks";

export function useConfirmPayment() {
  return usePost<void, ConfirmPaymentRequest>("/payments/confirm");
}
