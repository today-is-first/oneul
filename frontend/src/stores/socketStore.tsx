import { create } from "zustand";
import { Socket } from "socket.io-client";
import { socket } from "@/utils/socket";
import { useUserStore } from "@/stores/userStore";
import ChatMessage from "@/types/ChatMessage";
import { useFeedStore } from "@/stores/feedStore";
import { useChallengeStore } from "@/stores/challengeStore";
import { useQueryClient } from "@tanstack/react-query";

type SocketState = {
  socket: Socket;
  isConnected: boolean;
  messages: Record<number, ChatMessage[]>;
  unreadCount: Record<number, number>;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (content: string, challengeId: number) => void;
  setUnreadCount: (challengeId: number, count: number) => void;
  onFetchPreviousMessages: (challengeId: number, beforeId: number) => void;
  setInitSocketStore: () => void;
};

export const useSocketStore = create<SocketState>((set, get) => ({
  socket,
  isConnected: false,
  messages: {},
  unreadCount: {},
  setInitSocketStore: () => {
    set({
      messages: {},
      unreadCount: {},
      isConnected: false,
    });
  },
  setUnreadCount: (challengeId: number, count: number) => {
    set((state) => ({
      unreadCount: {
        ...state.unreadCount,
        [challengeId]: count,
      },
    }));
  },

  connect: () => {
    const { isConnected } = get();
    if (isConnected) return;

    const accessToken = useUserStore.getState().accessToken;

    if (!accessToken) {
      useUserStore.getState().logout();
      useFeedStore.getState().setInitFeedStore();
      useChallengeStore.getState().setInitChallengeStore();
      useSocketStore.getState().setInitSocketStore();
      console.log("Access token is not available");
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
        return {
          messages: {
            ...state.messages,
            [data.challengeId]: [...challengeMessages, data],
          },
        };
      });
    });

    socket.on("messages", (history: ChatMessage[]) => {
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

    socket.on(
      "previousMessages",
      (data: { challengeId: number; messages: ChatMessage[] }) => {
        console.log("🔄 previousMessages", data);
        set((state) => {
          const existing = state.messages[data.challengeId] || [];
          return {
            messages: {
              ...state.messages,
              [data.challengeId]: [...data.messages.reverse(), ...existing],
            },
          };
        });
      },
    );
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
        createdAt: new Date().toISOString(),
        nickname: user.nickname,
        userId: user.id,
      };

      socket.emit("chat", message);

      console.log("📤 Sent:", content);
    }
  },

  onFetchPreviousMessages: (challengeId: number, beforeId: number) => {
    const { socket } = get();
    console.log("🔄 onFetchPreviousMessages", challengeId, beforeId);
    socket.emit("fetchPreviousMessages", {
      challengeId,
      beforeId,
    });
  },
}));
