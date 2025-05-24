interface BadgeProps {
  type: "PENDING" | "APPROVED" | "REJECTED";
}

const badgeStyles: Record<BadgeProps["type"], string> = {
  PENDING: "bg-gray-500/25 text-gray-400",
  APPROVED: "bg-green-300/15 text-green-600",
  REJECTED: "bg-red-300/25 text-red-500",
};

const textContent: Record<BadgeProps["type"], string> = {
  PENDING: "대기",
  APPROVED: "승인",
  REJECTED: "거절",
};

function CheckStatus({ type }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 align-baseline text-xs font-semibold ${badgeStyles[type]}`}
    >
      {textContent[type]}
    </span>
  );
}

export default CheckStatus;
