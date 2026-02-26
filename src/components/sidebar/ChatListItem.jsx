import { usePresence } from "../../state/PresenceContext";

const ChatListItem = ({ chat, currentUserId, onSelect }) => {
  const { isOnline } = usePresence();
  const otherUser = chat.participants.find(
    (p) => p._id !== currentUserId
  );

  return (
    <div
      onClick={onSelect}
      className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-100 border-b"
    >
      {/* Online indicator */}
      {/* <span
        className={`w-2.5 h-2.5 rounded-full ${
          isOnline(otherUser._id) ? "bg-green-500" : "bg-gray-400"
        }`}
      /> */}

      <div className="flex-1">
        <p className="font-medium">{otherUser.name}</p>
        <p className="text-sm text-gray-500 truncate">
          {chat.lastMessage?.content || "No messages yet"}
        </p>
      </div>

      {chat.unreadCount > 0 && (
        <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
          {chat.unreadCount}
        </span>
      )}
    </div>
  );
};

export default ChatListItem;
