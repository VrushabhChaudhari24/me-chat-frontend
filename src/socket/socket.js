import { io } from "socket.io-client";
import { getToken } from "../utils/authStorage";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  auth: {
    token: getToken(),
  },
  transports: ["websocket"],
});

export const connectSocket = () => {
  const token = getToken();

  if (!token) {
    console.warn("⚠️ No token found, socket not connecting");
    return;
  }

  console.log("Connecting socket with token:", token);

  socket.auth = { token };
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;
