import { useState } from "react";
import { loginUser } from "../services/auth.service";
import {
  setToken,
  clearToken,
  setUserData,
} from "../utils/authStorage";
import socket from "../socket/socket";
import { AuthContext } from "./AuthContext";
import { connectSocket, disconnectSocket } from "../socket/socket";

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedUser = localStorage.getItem("user_data");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      loading: false,
    };
  });

  const login = async (mobile) => {
    const data = await loginUser({ mobile });

    setToken(data?.token, data?.user?.name);
    setUserData(data?.user);

    setAuthState({
      user: data?.user,
      loading: false,
    });
    
    connectSocket();
  };

  const logout = () => {
    clearToken();
    disconnectSocket();
    // socket.disconnect();
    setAuthState({ user: null, loading: false });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        login,
        logout,
        isAuthenticated: Boolean(authState.user),
        loading: authState.loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
