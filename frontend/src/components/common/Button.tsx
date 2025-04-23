interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="bg-gray-1 text-point p-2 rounded-md" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
