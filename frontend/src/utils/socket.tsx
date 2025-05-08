import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:8081";

export const socket: Socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});
