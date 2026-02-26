const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
};

export default Input;
