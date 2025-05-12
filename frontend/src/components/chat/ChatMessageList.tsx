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
            createdAt={message.createdAt ?? new Date().toISOString()}
            id={message.id ?? 0}
          />
        );
      })}
      <ChatMessageItem
        key={0}
        nickname="홍길동"
        content="안녕하세요! 반갑습니다."
        createdAt={new Date().toISOString()}
        id={0}
      />
      <ChatMessageItem
        key={1}
        nickname="홍길동"
        content="안녕하세요! 반갑습니다."
        createdAt={new Date().toISOString()}
        id={1}
      />
    </div>
  );
}

export default ChatMessageList;
