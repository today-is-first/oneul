interface BadgeProps {
  children: React.ReactNode;
  type: "challenge" | "normal";
}

function Badge({children, type}: BadgeProps) {
  const color = type === "challenge" ? "bg-point/25 text-point" : "bg-gray-500/25 text-gray-300";
  return <span className={`px-2 pt-1.5 pb-1 rounded-md ${color} text-sm inline-flex align-baseline font-semibold`}>{children}</span>
}

export default Badge;