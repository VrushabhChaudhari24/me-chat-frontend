import { useState } from "react";
import { toast } from "react-toastify";
import { sendConnectionRequest } from "../../services/connection.service";

const UserSearchItem = ({ user }) => {
  const [status, setStatus] = useState("idle"); 
  // idle | pending | connected

  const handleSendRequest = async () => {
    try {
      setStatus("pending");
      await sendConnectionRequest(user._id);
      toast.success("Connection request sent");
    } catch (err) {
      setStatus("idle");
      toast.error(
        err.response?.data?.message || "Failed to send request"
      );
    }
  };

  return (
    <div className="flex justify-between items-center border p-3 rounded">
      <div>
        {/* <p className="font-medium">{user.name}</p>
        <p className="text-sm text-gray-500">{user.mobile}</p> */}
      </div>

      {status === "idle" && (
        <button
          onClick={handleSendRequest}
          className="bg-primary text-white px-3 py-1 rounded text-sm"
        >
          Connect
        </button>
      )}

      {status === "pending" && (
        <span className="text-sm text-gray-500">Pending</span>
      )}

      {status === "connected" && (
        <span className="text-sm text-green-600">Connected</span>
      )}
    </div>
  );
};

export default UserSearchItem;
