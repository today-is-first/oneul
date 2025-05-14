interface BadgeProps {
  children: React.ReactNode;
  type: "challenge" | "normal";
}

function Badge({ children, type }: BadgeProps) {
  const color =
    type === "challenge"
      ? "bg-[#8B5CF6]/25 text-[#8B5CF6]"
      : "bg-gray-500/25 text-gray-300";
  return (
    <span
      className={`rounded-md px-2 pb-1 pt-1.5 ${color} inline-flex align-baseline text-sm font-semibold`}
    >
      {children}
    </span>
  );
}

export default Badge;
