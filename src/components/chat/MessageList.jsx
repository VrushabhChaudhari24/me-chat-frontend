import MessageStatus from "./MessageStatus";

const MessageList = ({ messages, currentUserId }) => {
  return (
    <div className="space-y-2">
      {messages.map((msg) => {
        const senderId =
          typeof msg.sender === "string"
            ? msg.sender
            : msg.sender?._id;

        const isSender = senderId === currentUserId;

        const delivered = true;

        const read =
          msg.readBy?.length > 1 &&
          msg.readBy.includes(currentUserId) &&
          msg.readBy.some((id) => id !== currentUserId);

        return (
          <div
            key={msg._id}
            className={`flex ${isSender ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                isSender
                  ? "bg-[#d9fdd3] rounded-br-none"
                  : "bg-white rounded-bl-none"
              }`}
            >
              {msg.content}

              <MessageStatus
                isSender={isSender}
                delivered={delivered}
                read={read}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
