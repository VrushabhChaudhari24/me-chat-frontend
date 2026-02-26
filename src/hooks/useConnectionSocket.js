import { useEffect } from "react";
import socket from "../socket/socket";
import { toast } from "react-toastify";

const useConnectionSocket = ({
  onNewRequest,
  onAccepted,
  onRejected,
  onMutualAdded,
}) => {
  useEffect(() => {
    socket.on("connection:request", (data) => {
      toast.info("New connection request");
      onNewRequest?.(data);
    });

    socket.on("connection:accepted", () => {
      toast.success("Connection accepted");
      onAccepted?.();
    });

    socket.on("connection:rejected", () => {
      toast.error("Connection rejected");
      onRejected?.();
    });

    socket.on("connection:mutual-added", (data) => {
      onMutualAdded?.(data);
    });

    return () => {
      socket.off("connection:request");
      socket.off("connection:accepted");
      socket.off("connection:rejected");
      socket.off("connection:mutual-added");
    };
  }, []);
};

export default useConnectionSocket;
