interface BadgeProps {
  children: React.ReactNode;
  type: "CHALLENGE" | "NORMAL" | "RECRUITING" | "ENDED";
}

function Badge({ children, type }: BadgeProps) {
  let color;
  switch (type) {
    case "CHALLENGE":
      color = "bg-[#8B5CF6]/25 text-[#8B5CF6]";
      break;
    case "NORMAL":
      color = "bg-gray-500/25 text-gray-300";
      break;
    case "RECRUITING":
      color = "bg-yellow-100/25 text-amber-700";
  }

  return (
    <span
      className={`whitespace-nowrap rounded-md px-2 pb-1 pt-1.5 ${color} inline-flex align-baseline text-sm font-semibold`}
    >
      {children}
    </span>
  );
}

export default Badge;
