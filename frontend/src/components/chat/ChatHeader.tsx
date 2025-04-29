function ChatHeader() {
  return (
    <div className="bg-background flex h-14 items-center justify-between border-b border-gray-700 px-4">
      <div className="text-lg font-bold text-white">챌린지 1조 채팅방</div>
      <button className="text-sm text-gray-400 transition hover:text-white">
        나가기
      </button>
    </div>
  );
}

export default ChatHeader;
