import api from "./api";
import { toast } from "react-toastify";

export const sendConnectionRequest = async (userId) => {
  try {
    const response = await api.post(`/connections/request/${userId}`);
    toast.success("Connection request sent");
    return response.data;
  } catch (err) {
    const msg =
      err.response?.data?.message ||
      err.response?.data ||
      err.message ||
      "Request failed";
    toast.error(typeof msg === "string" ? msg : JSON.stringify(msg));
    throw err;
  }
}

// export const acceptConnectionRequest = (requestId) =>
//   api.post(`/connections/accept/${requestId}`);

export const acceptConnectionRequest = (requestId) =>
  api.post(`/connections/accept-chat/${requestId}`);

export const rejectConnectionRequest = (requestId) =>
  api.post(`/connections/reject/${requestId}`);

export const getReceivedRequests = async () =>{
  const res  = await api.get("/connections/received");
  return res.data;
}

export const getSentRequests = async () => {
  const res = await api.get("/connections/sent");
  return res.data;
}

export const getMutualConnections = () =>
  api.get("/connections/mutual");
