function ChatMessageItem({
  sender,
  content,
  isMe = false,
}: {
  sender: string;
  content: string;
  isMe?: boolean;
}) {
  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
      <span className="mb-1 text-xs text-gray-400">{isMe ? "나" : sender}</span>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
          isMe ? "bg-point text-white" : "bg-[#2A2A2D] text-white"
        }`}
      >
        {content}
      </div>
    </div>
  );
}

export default ChatMessageItem;
