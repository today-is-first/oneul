import { create } from "zustand";
import { Socket } from "socket.io-client";
import { socket } from "../utils/socket";
import { useUserStore } from "./userStore";

type Message = {
  sender: string;
  content: string;
  isMe: boolean;
};

type SocketState = {
  socket: Socket;
  isConnected: boolean;
  messages: Message[];
  connect: () => void;
  disconnect: () => void;
  sendMessage: (content: string) => void;
};

export const useSocketStore = create<SocketState>((set, get) => ({
  socket,
  isConnected: false,
  messages: [],

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
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
      set({ isConnected: false });
    });

    // 채팅 메시지 수신
    socket.on("chat", (data: { sender: string; content: string }) => {
      const currentUser = useUserStore.getState().user;
      set((state) => ({
        messages: [
          ...state.messages,
          {
            sender: data.sender,
            content: data.content,
            isMe: data.sender === currentUser?.name,
          },
        ],
      }));
    });
  },

  disconnect: () => {
    socket.disconnect();
    set({ isConnected: false });
  },

  sendMessage: (content: string) => {
    const { socket } = get();
    const user = useUserStore.getState().user;
    if (content.trim()) {
      socket.emit("chat", {
        sender: user?.name || "나",
        content: content,
      });
      console.log("content", content);
    }
  },
}));
