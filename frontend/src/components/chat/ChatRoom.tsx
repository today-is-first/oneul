import { useNavigate } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";
import ChatMessage from "@/types/ChatMessage";

function ChatRoom({
  challengeId,
  challengeName,
  messages,
  isChatOpen,
}: {
  challengeId: number;
  challengeName: string;
  messages: ChatMessage[];
  isChatOpen: boolean;
}) {
  return (
    <div className="bg-black-chat flex h-screen select-none flex-col border-r border-gray-700">
      <ChatHeader challengeId={challengeId} challengeName={challengeName} />
      <ChatMessageList
        messages={messages}
        isChatOpen={isChatOpen}
        challengeId={challengeId}
      />
      <ChatInput challengeId={challengeId} />
    </div>
  );
}

export default ChatRoom;
