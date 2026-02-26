import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import LoginPage from "../pages/LoginPage";
import ChatPage from "../pages/ChatPage";
import SignupPage from "../pages/SignupPage";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* 🔓 Public route */}
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/signup"
        element={!user ? <SignupPage /> : <Navigate to="/" replace />}
      />
      
      {/* 🔐 Protected route */}
      <Route
        path="/"
        element={user ? <ChatPage /> : <Navigate to="/login" replace />}
      />

      {/* Catch-all */}
      <Route
        path="*"
        element={<Navigate to={user ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
