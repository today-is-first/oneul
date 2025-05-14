import ChatMessageItem from "./ChatMessageItem";
import ChatSystemMessage from "./ChatSystemMessage";
import ChatMessage from "@/types/ChatMessage";

function ChatMessageList({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
      <ChatSystemMessage message="홍길동님이 입장했습니다." />
      {messages.map((message, index) => {
        return (
          <ChatMessageItem
            key={index}
            nickname={message.nickname}
            content={message.content}
            createdAt={message.createdAt}
            id={message.id ?? 0}
          />
        );
      })}
    </div>
  );
}

export default ChatMessageList;
