import { create } from "zustand";
import { Socket } from "socket.io-client";
import { socket } from "../utils/socket";
import { useUserStore } from "./userStore";
import ChatMessage from "@/types/ChatMessage";

type SocketState = {
  socket: Socket;
  isConnected: boolean;
  messages: Record<number, ChatMessage[]>;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (content: string, challengeId: number) => void;
};

export const useSocketStore = create<SocketState>((set, get) => ({
  socket,
  isConnected: false,
  messages: {},

  connect: () => {
    const { isConnected } = get();
    if (isConnected) return;

    const accessToken = useUserStore.getState().accessToken;
    if (!accessToken) {
      console.error("Access token is not available");
      return;
    }

    socket.io.opts.query = {
      token: `Bearer ${accessToken}`,
    };
    socket.connect();

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
      set({ isConnected: true });
      socket.emit("messages", {});
      console.log("🔄 messages");
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
      set({ isConnected: false });
    });

    socket.on("chat", (data: ChatMessage) => {
      set((state) => {
        const challengeMessages = state.messages[data.challengeId] || [];
        console.log("🔄 challengeMessages", challengeMessages);
        return {
          messages: {
            ...state.messages,
            [data.challengeId]: [...challengeMessages, data],
          },
        };
      });
    });

    socket.on("messages", (history: ChatMessage[]) => {
      console.log("🔄 messages", history);
      const grouped: Record<number, ChatMessage[]> = {};
      for (const msg of history) {
        if (!grouped[msg.challengeId]) grouped[msg.challengeId] = [];
        grouped[msg.challengeId].push(msg);
      }
      set((state) => ({
        messages: {
          ...state.messages,
          ...grouped,
        },
      }));
    });
  },

  disconnect: () => {
    socket.disconnect();
    set({ isConnected: false });
  },

  sendMessage: (content: string, challengeId: number) => {
    const { socket } = get();
    const user = useUserStore.getState().user;
    if (!user) {
      console.error("User is not available");
      return;
    }

    if (content.trim()) {
      const message: ChatMessage = {
        id: null,
        content: content,
        challengeId: challengeId,
        createdAt: null,
        nickname: user.nickname,
        userId: user.id,
      };

      socket.emit("chat", message); // 서버 전송

      // 낙관적 UI 업데이트
      set((state) => {
        const prev = state.messages[challengeId] || [];
        console.log("🔄 prev", prev);
        return {
          messages: {
            ...state.messages,
            [challengeId]: [...prev, message],
          },
        };
      });

      console.log("📤 Sent:", content);
    }
  },
}));
