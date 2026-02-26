const TOKEN_KEY = "auth_token";
const NAME_KEY = "name";
const USER_KEY = "user_data";

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token, name) => {
  console.log("setToken:---------->", token);
  localStorage.setItem(TOKEN_KEY, token);
  if (name) localStorage.setItem(NAME_KEY, name);
};

export const setUserData = (user) => {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (err) {
    console.error("Failed to store user data", err);
  }
};

export const getUserData = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Failed to parse user data", err);
    return null;
  }
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(NAME_KEY);
};
