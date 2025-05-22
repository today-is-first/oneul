interface BadgeProps {
  children: React.ReactNode;
  type: "CHALLENGE" | "NORMAL" | "RECRUITING" | "ENDED";
}

function Badge({ children, type }: BadgeProps) {
  let color;
  switch (type) {
    case "CHALLENGE":
      color = "bg-primary-purple-200/25 text-primary-purple-200";
      break;
    case "NORMAL":
      color = "bg-gray-500/25 text-gray-300";
      break;
    case "RECRUITING":
      color = "bg-green-300/15 text-green-600";
      break;
    case "ENDED":
      color = "bg-transparent border border-gray-700 box-border text-gray-400";
      break;
  }

  return (
    <span
      className={`bg-prim text-re whitespace-nowrap rounded-md px-2 pb-1 pt-1.5 ${color} inline-flex align-baseline text-sm font-semibold`}
    >
      {children}
    </span>
  );
}

export default Badge;
