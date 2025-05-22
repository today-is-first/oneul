import { ToastMessage } from "@/types/Toast";
import { ToastBox } from "./ToastBox";

type ToastListProps = {
  messages: ToastMessage[];
  closeToast: (id: string) => void;
};
export function ToastList({ messages, closeToast }: ToastListProps) {
  return (
    <div className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 transform flex-col items-center gap-4">
      {messages.map((msg) => (
        <ToastBox key={msg.id} {...msg} onClose={closeToast} />
      ))}
    </div>
  );
}
