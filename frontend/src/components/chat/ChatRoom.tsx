import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import ChatMessage from "@/types/ChatMessage";

function ChatRoom({
  challengeId,
  challengeName,
  messages,
}: {
  challengeId: number;
  challengeName: string;
  messages: ChatMessage[];
}) {
  return (
    <div className="bg-black-chat flex min-h-screen select-none flex-col border-r border-gray-700">
      <ChatHeader challengeName={challengeName} />
      <ChatMessageList messages={messages} />
      <ChatInput challengeId={challengeId} />
    </div>
  );
}

export default ChatRoom;
