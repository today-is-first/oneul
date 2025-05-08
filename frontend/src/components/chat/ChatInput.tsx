import { useState } from "react";
import { useSocketStore } from "@stores/socketStore";

function ChatInput() {
  const [message, setMessage] = useState("");
  const { sendMessage } = useSocketStore();

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-background flex items-center border-t border-gray-700 px-4 py-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="메시지를 입력하세요"
        className="focus:ring-point flex-1 rounded-full bg-[#2A2A2D] px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2"
      />
      <button
        onClick={handleSend}
        className="bg-point ml-3 rounded-full px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90"
      >
        보내기
      </button>
    </div>
  );
}

export default ChatInput;
