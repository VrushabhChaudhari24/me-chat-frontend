const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full bg-primary text-white py-2 rounded-md font-medium hover:opacity-90 transition"
    >
      {children}
    </button>
  );
};

export default Button;
