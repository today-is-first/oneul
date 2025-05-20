import { useEffect, useRef, useState } from "react";
import ChatMessageItem from "./ChatMessageItem";
import ChatMessage from "@/types/ChatMessage";
import { FaArrowDown } from "react-icons/fa";

import { useSocketStore } from "@/stores/socketStore";
interface ChatMessageListProps {
  messages: ChatMessage[];
  isChatOpen: boolean;
  challengeId: number;
}

function ChatMessageList({
  messages,
  isChatOpen,
  challengeId,
}: ChatMessageListProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  console.log(messages);

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const [isScrolledToTop, setIsScrolledToTop] = useState(false);
  const [shouldShowScrollButton, setShouldShowScrollButton] = useState(false);
  const { onFetchPreviousMessages } = useSocketStore();

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    let scrollHoldTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollHeight - scrollTop - clientHeight < 150;
      const atTop = scrollTop === 0;

      setIsScrolledToBottom(atBottom);
      setShouldShowScrollButton(!atBottom);
      setIsScrolledToTop(atTop);

      if (atTop && !scrollHoldTimer) {
        scrollHoldTimer = setTimeout(() => {
          handlePreviousMessagesRequest();
        }, 1000);
      } else if (!atTop && scrollHoldTimer) {
        clearTimeout(scrollHoldTimer);
        scrollHoldTimer = null;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollHoldTimer) clearTimeout(scrollHoldTimer);
    };
  }, [messages]);

  const handlePreviousMessagesRequest = () => {
    if (messages.length > 0) {
      const firstMessageId = messages[0].id;
      console.log("firstMessageId", firstMessageId);
      console.log("challengeId", challengeId);
      if (firstMessageId) {
        onFetchPreviousMessages(challengeId, firstMessageId);
      }
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isChatOpen && isScrolledToBottom) {
      scrollToBottom();
      setShouldShowScrollButton(false);
    } else if (isChatOpen && !isScrolledToBottom) {
      setShouldShowScrollButton(true);
    }
  }, [messages]);

  return (
    <>
      <div
        ref={chatContainerRef}
        className="flex-1 space-y-4 overflow-y-auto px-4 py-6"
      >
        {messages.map((message, index) => (
          <ChatMessageItem
            key={index}
            nickname={message.nickname}
            content={message.content}
            createdAt={message.createdAt}
            id={message.id ?? 0}
          />
        ))}
      </div>

      {shouldShowScrollButton && (
        <button
          onClick={scrollToBottom}
          className="right-30 absolute bottom-20 flex items-center gap-2 rounded-full bg-purple-600 px-3 py-2 text-sm text-white shadow-md hover:bg-purple-700"
        >
          <FaArrowDown size={14} />맨 아래로
        </button>
      )}
    </>
  );
}

export default ChatMessageList;
