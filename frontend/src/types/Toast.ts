export type ToastType = "success" | "caution" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}
