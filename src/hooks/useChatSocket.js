import { useEffect } from "react";
import socket from "../socket/socket";

const useChatSocket = ({ onChatCreated }) => {
  useEffect(() => {
    socket.on("chat:created", (data) => {
      onChatCreated?.(data);
    });

    return () => {
      socket.off("chat:created");
    };
  }, []);
};

export default useChatSocket;
