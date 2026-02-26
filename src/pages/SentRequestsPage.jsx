import { useEffect, useState } from "react";
import { getSentRequests } from "../services/connection.service";

const statusStyles = {
  pending: "bg-gray-100 text-gray-600",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const SentRequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getSentRequests().then((res) => setRequests(res));
  }, []);

  if (!requests.length) {
    return (
      <div className="px-4 py-6 text-sm text-gray-500 text-center">
        No sent requests
      </div>
    );
  }

  return (
    <div className="px-4 py-3 space-y-2">
      {requests.map((req) => (
        <div
          key={req._id}
          className="flex items-center justify-between gap-3 border rounded-lg px-3 py-2 bg-white shadow-sm"
        >
          {/* USER INFO */}
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-sm truncate">
              {req.receiver.name}
            </span>
            <span className="text-xs text-gray-500">
              {req.receiver.mobile}
            </span>
          </div>

          {/* STATUS BADGE */}
          <span
            className={`text-xs px-2 py-1 rounded-full capitalize whitespace-nowrap ${
              statusStyles[req.status]
            }`}
          >
            {req.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SentRequestsPage;
