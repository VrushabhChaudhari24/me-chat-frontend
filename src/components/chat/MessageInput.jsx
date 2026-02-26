import { useState } from "react";

const MessageInput = ({ onSend, onTyping }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping();
  };

  const handleSend = () => {
    console.log("Sending message:", text);
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
   <div className="flex items-center gap-2 md:gap-3">
      <input
        value={text}
        onChange={handleChange}
        placeholder="Type a message"
        className="flex-1 px-4 py-3 md:py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <button onClick={handleSend} className="bg-primary text-white px-4 py-2 rounded-full" >Send</button>
    </div>
  );
};

export default MessageInput;
