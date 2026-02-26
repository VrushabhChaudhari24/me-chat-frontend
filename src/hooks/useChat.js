import { useEffect, useState, useRef } from "react";
import socket from "../socket/socket";
import { getChatMessages } from "../services/chat.service";

const useChat = (chatId, receiverId) => {
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const typingTimeout = useRef(null);

  useEffect(() => {
    if (!chatId) return;

    socket.connect();
    socket.emit("join-chat", chatId);

    getChatMessages(chatId).then((res) => {
      const msgs = Array.isArray(res) ? res : res?.messages || [];
      setMessages(msgs);
    });

    socket.on("receive-message", (message) => {
      if (message.chatId === chatId) {
        setMessages((prev) => {
          const base = Array.isArray(prev) ? prev : [];
          return [...base, message];
        });
      }
    });

    socket.on("user-typing", ({ userId }) => {
      if (userId !== receiverId) return;
      setTypingUser(userId);
    });

    socket.on("user-stopped-typing", () => {
      setTypingUser(null);
    });

    socket.on("messages-read", () => {
      setMessages((prev) => {
        const base = Array.isArray(prev) ? prev : [];
        return base.map((msg) => ({
          ...msg,
          readBy: [...new Set([...(msg?.readBy || []), receiverId])],
        }));
      });
    });

    return () => {
      socket.off("receive-message");
      socket.off("user-typing");
      socket.off("user-stopped-typing");
      socket.off("messages-read");
    };
  }, [chatId]);

  const sendMessage = (content) => {
    console.log("Sending message to chatId:", chatId, "with content:", content);
    socket.emit("send-message", {
      chatId,
      receiverId,
      content,
    });
    console.log("messaged send")
    socket.emit("typing-stop", { chatId });
  };

  const startTyping = () => {
    socket.emit("typing-start", { chatId });

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      socket.emit("typing-stop", { chatId });
    }, 1500);
  };

  return {
    messages,
    sendMessage,
    startTyping,
    typingUser,
  };
};

export default useChat;
