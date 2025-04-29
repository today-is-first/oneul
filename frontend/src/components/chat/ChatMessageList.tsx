import ChatMessageItem from "./ChatMessageItem";
import ChatSystemMessage from "./ChatSystemMessage";

function ChatMessageList() {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6">
      <ChatSystemMessage message="홍길동님이 입장했습니다." />
      <ChatMessageItem
        sender="나"
        content="안녕하세요! 오늘 운동했어요."
        isMe
      />
      <ChatMessageItem sender="홍길동" content="저도 했어요! 🏃‍♂️" />
      {/* 더 많은 메시지들 */}
    </div>
  );
}

export default ChatMessageList;
