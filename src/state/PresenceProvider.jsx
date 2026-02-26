import { useEffect, useState, useRef } from "react";
import socket from "../socket/socket";
import { PresenceContext } from "./PresenceContext";
import { useAuth } from "./AuthContext";

export const PresenceProvider = ({ children }) => {
  const { user } = useAuth();
  const [onlineUsers, setOnlineUsers] = useState([]);
  // const initializedRef = useRef(false);

  useEffect(() => {
    if (!user?._id) return;

    // initializedRef.current = true;

    // 🔥 Attach auth before anything else
    // socket.auth = { userId: user._id };

    // if (!socket.connected) {
    //   socket.connect();
    // }


    // 🔥 Emit presence AFTER connect
    // socket.emit("user-online", { userId: user._id });

    const handleConnect = () => {
      // ✅ NOW server always receives this
      socket.emit("user-online");
    };

    const handleDisconnect = () => {
      socket.emit("user-offline");
    };

    const onOnlineUsers = ({ users }) => {
      setOnlineUsers(users);
    };

    const onUserOnline = ({ userId }) => {
      setOnlineUsers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );
    };

    const onUserOffline = ({ userId }) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("online-users", onOnlineUsers);
    socket.on("user-online", onUserOnline);
    socket.on("user-offline", onUserOffline);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("online-users", onOnlineUsers);
      socket.off("user-online", onUserOnline);
      socket.off("user-offline", onUserOffline);
    };
  }, [user?._id]);

  const isOnline = (userId) => onlineUsers.includes(userId);
  
  return (
    <PresenceContext.Provider value={{ onlineUsers, isOnline }}>
      {children}
    </PresenceContext.Provider>
  );
};
