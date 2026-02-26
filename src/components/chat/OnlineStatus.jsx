const OnlineStatus = ({ online }) => {
  return (
    <span
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: online ? "#22c55e" : "#9ca3af",
        display: "inline-block",
        marginRight: 6,
      }}
    />
  );
};

export default OnlineStatus;
