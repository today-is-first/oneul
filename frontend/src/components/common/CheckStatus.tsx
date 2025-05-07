interface BadgeProps {
  type: "PENDING" | "APPROVED" | "REJECTED";
}

const badgeStyles: Record<BadgeProps["type"], string> = {
  PENDING: "bg-yellow-100/80 text-yellow-800",
  APPROVED: "bg-green-100/80 text-green-800",
  REJECTED: "bg-red-100/80 text-red-800",
};

const textContent: Record<BadgeProps["type"], string> = {
  PENDING: "검토중",
  APPROVED: "승인",
  REJECTED: "미승인",
};

function CheckStatus({ type }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 align-baseline text-xs font-medium ${badgeStyles[type]}`}
    >
      {textContent[type]}
    </span>
  );
}

export default CheckStatus;
