import OnlineStatus from "./OnlineStatus";
import { usePresence } from "../../state/PresenceContext";
import UnreadBadge from "./UnreadBadge";

const ChatListItem = ({ chat, currentUserId, onSelect }) => {
  const { isOnline } = usePresence();

  const otherUser = chat.participants.find(
    (p) => p._id !== currentUserId
  );

  return (
    <div
      onClick={() => onSelect(chat)}
      style={{
        padding: 10,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {/* <OnlineStatus online={isOnline(otherUser._id)} /> */}
      <div>
        <strong>{otherUser.name || otherUser.mobile}</strong>
        <div style={{ fontSize: 12 }}>
          {chat.lastMessage?.content}
        </div>
      </div>
      <UnreadBadge count={chat.unreadCount} />
    </div>
  );
};

export default ChatListItem;
