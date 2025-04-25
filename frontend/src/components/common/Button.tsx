interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="bg-point flex h-[32px] w-[64px] cursor-pointer items-center justify-center rounded-lg text-white"
      onClick={onClick}
    >
      <span className="text-center text-sm">{children}</span>
    </button>
  );
}

export default Button;
