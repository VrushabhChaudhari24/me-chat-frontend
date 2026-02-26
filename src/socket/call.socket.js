import socket from "./socket";

export const callUser = (receiverId, callType) => {
  socket.emit("call-user", { receiverId, callType });
};

export const acceptCall = (callerId) => {
  socket.emit("accept-call", { callerId });
};

export const rejectCall = (callerId) => {
  socket.emit("reject-call", { callerId });
};

export const sendOffer = (receiverId, offer) => {
  socket.emit("offer", { receiverId, offer });
};

export const sendAnswer = (receiverId, answer) => {
  socket.emit("answer", { receiverId, answer });
};

export const sendIceCandidate = (receiverId, candidate) => {
  socket.emit("ice-candidate", { receiverId, candidate });
};

export const endCall = (receiverId) => {
  socket.emit("end-call", { receiverId });
};
