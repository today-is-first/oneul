import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

function ChatRoom() {
  return (
    <div className="bg-black-chat flex min-h-screen select-none flex-col border-r border-gray-700">
      <ChatHeader />
      <ChatMessageList />
      <ChatInput />
    </div>
  );
}

export default ChatRoom;
