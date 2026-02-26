import { useAuth } from "../../state/AuthContext";

const SidebarHeader = () => {
  const { logout } = useAuth();
  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      {/* Top actions */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-lg">Chats</h2>

        <div className="flex gap-3 text-gray-600">
          <button
            onClick={logout}
            className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

      {/* REQUEST SUB-TABS */}
      {/* {activeTab === "requests" && (
        <div className="flex justify-center gap-6 py-2 bg-gray-50 text-sm">
          <button
            onClick={() => setRequestView("received")}
            className={
              requestView === "received"
                ? "font-semibold"
                : "text-gray-500"
            }
          >
            Received
          </button>
          <button
            onClick={() => setRequestView("sent")}
            className={
              requestView === "sent"
                ? "font-semibold"
                : "text-gray-500"
            }
          >
            Sent
          </button>
        </div>
      )} */}
      </div>

      
    </div>
  );
};

export default SidebarHeader;
