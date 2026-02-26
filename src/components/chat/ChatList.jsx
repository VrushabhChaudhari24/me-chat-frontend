import ChatListItem from "./ChatListItem";

const ChatList = ({ chats, currentUserId, onSelectChat }) => {
  
  return (
    <div style={{ width: 300, borderRight: "1px solid #ccc" }}>
      {chats.map((chat) => (
        <ChatListItem
          key={chat._id}
          chat={chat}
          currentUserId={currentUserId}
          onSelect={onSelectChat}
        />
      ))}
    </div>
  );
};

export default ChatList;
