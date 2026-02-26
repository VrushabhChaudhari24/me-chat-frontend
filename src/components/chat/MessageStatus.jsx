const MessageStatus = ({ isSender, delivered, read }) => {
  if (!isSender) return null;

  let color = "#9ca3af"; // gray
  let text = "✓";

  if (delivered) text = "✓✓";
  if (read) color = "#2563eb"; // blue

  return (
    <span
      style={{
        fontSize: 12,
        marginLeft: 6,
        color,
      }}
    >
      {text}
    </span>
  );
};

export default MessageStatus;
