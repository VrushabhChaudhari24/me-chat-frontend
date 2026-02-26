const TypingIndicator = ({ isTyping }) => {
  if (!isTyping) return null;

  return (
   <div className="text-xs text-gray-500 mt-2">
      Typing...
    </div>
  );
};

export default TypingIndicator;
