import { getOrCreateChat } from "../services/chat.service";

const ConnectionsList = ({ connections }) => {
  const onChat = (user) => {
    getOrCreateChat(user._id);
  };
  
  return (
    <div className="space-y-2">
      {connections.map((user) => (
        <div
          key={user._id}
          className={`flex justify-between items-center border p-3 rounded cursor-pointer 
            ${!user.isMutual ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-gray-50"}
            `}
            onClick={() => user.isMutual && onChat(user)}
        >
          <span className="font-medium">{user.name}</span>
          <button className=" text-sm">Chat</button>
        </div>
      ))}
    </div>
  );
};

export default ConnectionsList;
