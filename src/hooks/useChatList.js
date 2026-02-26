import { useCallback, useEffect, useState } from "react";
import { getUserChats } from "../services/chat.service";
import socket from "../socket/socket";
import api from "../services/api";

const useChatList = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadChats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getUserChats();
      setChats(data);
    } finally {
      setLoading(false);
    }
  }, []);

  // const loadChats = async () => {
  //   setLoading(true);
  //   const data = await getUserChats();
  //   setChats(data);
  //   setLoading(false);
  // };

  const addChat = async (chatId) => {
    const res = await api.get(`/chat/${chatId}`);
    setChats((prev) => [res.data, ...prev]);
  };

  useEffect(() => {
    loadChats();
  }, [loadChats]);


  useEffect(() => {
  socket.on("receive-message", ({ chatId }) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat._id === chatId
          ? { ...chat, unreadCount: chat.unreadCount + 1 }
          : chat
      )
    );
  });

  socket.on("messages-read", ({ chatId }) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat._id === chatId
          ? { ...chat, unreadCount: 0 }
          : chat
      )
    );
  });

  return () => {
    socket.off("receive-message");
    socket.off("messages-read");
  };
}, []);


  return {
    chats,
    loading,
    addChat,
    refresh: loadChats,
  };
};

export default useChatList;
