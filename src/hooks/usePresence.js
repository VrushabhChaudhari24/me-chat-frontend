import { useEffect, useState } from "react";
import socket from "../socket/socket";

const usePresence = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on("online-users", ({ users }) => {
      setOnlineUsers(users);
    });

    socket.on("user-online", ({ userId }) => {
      setOnlineUsers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );
    });

    socket.on("user-offline", ({ userId }) => {
      setOnlineUsers((prev) =>
        prev.filter((id) => id !== userId)
      );
    });

    return () => {
      socket.off("online-users");
      socket.off("user-online");
      socket.off("user-offline");
    };
  }, []);

  const isOnline = (userId) => onlineUsers.includes(userId);

  return {
    onlineUsers,
    isOnline,
  };
};

export default usePresence;
