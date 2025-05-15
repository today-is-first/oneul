import ChatBanner from "@/components/chat/ChatBanner";

function ChatHeader({
  challengeId,
  challengeName,
}: {
  challengeId: number;
  challengeName: string;
}) {
  return (
    <div className="bg-black-chat flex h-14 items-center justify-between border-b border-gray-700 px-4">
      <div className="text-lg font-bold text-white">{challengeName}</div>
      <ChatBanner challengeId={challengeId} />
    </div>
  );
}

export default ChatHeader;
