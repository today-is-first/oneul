import { create } from "zustand";
import { Socket } from "socket.io-client";
import { socket } from "../utils/socket";
import { useUserStore } from "./userStore";

type SocketState = {
  socket: Socket;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
};

export const useSocketStore = create<SocketState>((set) => ({
  socket,
  isConnected: false,

  connect: () => {
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
  },

  disconnect: () => {
    socket.disconnect();
    set({ isConnected: false });
  },
}));
