type ChatMessage = {
  id: number | null;
  content: string;
  createdAt: string | null;
  challengeId: number;
  nickname: string;
  userId: number;
};

export default ChatMessage;
