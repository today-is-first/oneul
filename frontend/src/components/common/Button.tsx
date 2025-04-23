interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="bg-point text-white p-2 rounded-md" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
