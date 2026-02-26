import ChatListItem from "./ChatListItem";

const ChatList = ({ chats, currentUserId, onSelectChat }) => {
  
  if (!chats.length) {
    return (
      <p className="text-sm text-gray-500 p-4">
        No conversations yet
      </p>
    );
  }

  return (
    <div>
      {chats.map((chat) => (
        <ChatListItem
          key={chat._id}
          chat={chat}
          currentUserId={currentUserId}
          onSelect={() => onSelectChat(chat)}
        />
      ))}
    </div>
  );
};

export default ChatList;
