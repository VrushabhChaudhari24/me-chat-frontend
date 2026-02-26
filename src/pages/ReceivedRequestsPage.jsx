import { useState } from "react";
import {
  getReceivedRequests,
  acceptConnectionRequest,
  rejectConnectionRequest,
} from "../services/connection.service";
import { toast } from "react-toastify";
import { getUserChats } from "../services/chat.service";

const ReceivedRequestsPage = ({ receivedRequests, refetchReceivedRequests }) => {
  const [requests, setRequests] = useState(receivedRequests);

  const handleAccept = async (id) => {
    try {
      await acceptConnectionRequest(id);
      toast.success("Connection accepted");
      getUserChats();
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch {
      toast.error("Failed to accept request");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectConnectionRequest(id);
      toast.info("Request rejected");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch {
      toast.error("Failed to reject request");
    }
  };

  return (
    <div className="p-4 space-y-3">
      
      {requests?.length === 0 && (
        <p className="text-sm text-gray-500">
          No pending requests
        </p>
      )}

      {requests?.map((req) => (
        <div
          key={req._id}
          className="flex justify-between items-center border p-3 rounded"
        >
          <div>
            <p className="font-medium">{req.sender.name}</p>
            <p className="text-sm text-gray-500">
              {req.sender.mobile}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleAccept(req._id)}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              Accept
            </button>

            <button
              onClick={() => handleReject(req._id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceivedRequestsPage;
