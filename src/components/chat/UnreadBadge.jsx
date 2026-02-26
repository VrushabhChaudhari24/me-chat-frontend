const UnreadBadge = ({ count }) => {
  if (!count) return null;

  return (
    <span
      style={{
        background: "#22c55e",
        color: "white",
        borderRadius: "50%",
        padding: "4px 8px",
        fontSize: 12,
        marginLeft: "auto",
      }}
    >
      {count}
    </span>
  );
};

export default UnreadBadge;
