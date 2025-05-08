import { useSocketStore } from "@stores/socketStore";
import ChatMessageItem from "./ChatMessageItem";
import ChatSystemMessage from "./ChatSystemMessage";

function ChatMessageList() {
  const { messages } = useSocketStore();

  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
      <ChatSystemMessage message="홍길동님이 입장했습니다." />
      {messages.map((message, index) => (
        <ChatMessageItem
          key={index}
          sender={message.sender}
          content={message.content}
          isMe={message.isMe}
        />
      ))}
    </div>
  );
}

export default ChatMessageList;
