interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="bg-point text-white rounded-lg w-[64px] h-[32px] flex justify-center items-center"
      onClick={onClick}
    >
      <span className="text-center text-sm">{children}</span>
    </button>
  );
}

export default Button;
