import OnlineStatus from "./OnlineStatus";
import { usePresence } from "../../state/PresenceContext";

const ChatHeader = ({ connections, onCall, onBack }) => {
  const { isOnline } = usePresence();

  return (
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex items-center gap-3">
        <OnlineStatus online={isOnline(connections[0]._id)} />

        <div className="flex flex-col">
          <span className="font-semibold">{connections[0].name}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="md:hidden" onClick={onBack}>
          ←
        </button>
        <button
          onClick={() => onCall("audio")}
          className="text-sm px-3 py-1 bg-primary text-white rounded disabled:opacity-50"
        >
          📞
        </button>

        <button
          onClick={() => onCall("video")}
          className="text-sm px-3 py-1 bg-primary text-white rounded disabled:opacity-50"
        >
          🎥
        </button>
      </div>
      {/* <button onClick={() => call.callUser(userId, "audio")}>📞</button>
      <button onClick={() => call.callUser(userId, "video")}>🎥</button> */}
    </div>
  );
};

export default ChatHeader;
