import { useUserStore } from "@/stores/userStore";

type ChatMessageItemProps = {
  nickname: string;
  content: string;
  createdAt: string;
  id: number;
};

import { formatTimeHHMM } from "@/utils/date";

function ChatMessageItem({
  nickname,
  content,
  createdAt,
  id,
}: ChatMessageItemProps) {
  const isMe = nickname === useUserStore.getState().user?.nickname;
  return (
    <div
      data-id={id}
      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
    >
      <span className="mb-1 text-xs text-gray-400">
        {isMe ? "나" : nickname}
      </span>
      <div className="flex items-end gap-2">
        <div
          className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
            isMe ? "bg-point text-white" : "bg-[#2A2A2D] text-white"
          }`}
        >
          {content}
        </div>
        <span className="text-xs text-gray-400">
          {formatTimeHHMM(createdAt)}
        </span>
      </div>
    </div>
  );
}

export default ChatMessageItem;
