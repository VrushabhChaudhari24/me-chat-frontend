import api from "./api";

export const getOrCreateChat = async (targetUserId) => {
  const res = await api.post(`/chat/with/${targetUserId}`);
  return res.data;
};

export const getChatMessages = async (chatId) => {
  const res = await api.get(`/chat/${chatId}/messages`);
  return res.data;
};

export const getUserChats = async () => {
  const res = await api.get("/chat");
  return res.data;
};


export const markChatAsRead = async (chatId) => {
  await api.post(`/chat/${chatId}/read`);
};