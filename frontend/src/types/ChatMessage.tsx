type ChatMessage = {
  id: number | null;
  content: string;
  createdAt: string;
  challengeId: number;
  nickname: string;
  userId: number;
};

export default ChatMessage;
