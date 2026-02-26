import AppRoutes from "./routes";
import { AuthProvider } from "../state/AuthProvider";
import { useAuth } from "../state/AuthContext";
import { PresenceProvider } from "../state/PresenceProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConnectionProvider from "../state/ConnectionProvider";

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <AppRoutes />;
  }

  return (
    <PresenceProvider>
      <ConnectionProvider>
        <AppRoutes />
      </ConnectionProvider>
    </PresenceProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <AppContent />
    </AuthProvider>
  );
};

export default App;
