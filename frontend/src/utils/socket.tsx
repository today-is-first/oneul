import { io, Socket } from "socket.io-client";
import { useUserStore } from "@stores/userStore";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const connectSocket = () => {
  const accessToken = useUserStore.getState().accessToken;
  socket.io.opts.query = {
    token: `Bearer ${accessToken}`,
  };
  socket.connect();
};
