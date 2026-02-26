import api from "./api";

export const followUser = async (userId) => {
  const res = await api.post(`/follow/${userId}`);
  return res.data;
};

export const unfollowUser = async (userId) => {
  const res = await api.post(`/unfollow/${userId}`);
  return res.data;
};

// export const getFollowStatus = async (userId) => {
//   const res = await api.get(`/status/${userId}`);
//   return res.data;
// };

export const getMutaualList = async () => {
  const res = await api.get("/mutual-list");
  return res.data;
};