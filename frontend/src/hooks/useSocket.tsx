import { useEffect } from "react";
import { useSocketStore } from "../stores/socketStore";

export const useSocket = () => {
  const { socket, connect, disconnect, isConnected } = useSocketStore();

  useEffect(() => {
    if (!isConnected) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [isConnected, connect, disconnect]);

  return socket;
};
