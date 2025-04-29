import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

function ChatRoom() {
  return (
    <div className="bg-background flex min-h-screen select-none flex-col">
      <ChatHeader />
      <ChatMessageList />
      <ChatInput />
    </div>
  );
}

export default ChatRoom;
