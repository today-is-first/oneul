import { FiX } from "react-icons/fi";
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { ToastMessage, ToastType } from "@/types/Toast";
import { JSX } from "react";

const iconMap: Record<ToastType, JSX.Element> = {
  success: <AiOutlineCheckCircle className="text-primary-purple-100 h-5 w-5" />,
  caution: <AiOutlineWarning className="h-5 w-5 text-yellow-400" />,
  error: <AiOutlineCloseCircle className="h-5 w-5 text-red-400" />,
  info: <AiOutlineInfoCircle className="h-5 w-5 text-gray-300" />,
};

type ToastBoxProps = ToastMessage & { onClose: (id: string) => void };
export function ToastBox({ id, message, type, onClose }: ToastBoxProps) {
  return (
    <div className="animate-toast mb-2 flex w-fit min-w-[12.5rem] max-w-md items-center justify-between gap-4 rounded-xl border border-gray-700 bg-[#1B1B1E] p-5 text-gray-200 opacity-0 shadow-lg">
      <div className="flex items-center gap-3">
        {iconMap[type]}
        <span className="text-sm leading-snug">{message}</span>
      </div>
      <button
        onClick={() => onClose(id)}
        className="opacity-70 hover:opacity-100"
      >
        <FiX className="h-4 w-4" />
      </button>
    </div>
  );
}
