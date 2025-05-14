import { ReactNode } from "react";

function CardContent({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`p-4 sm:p-6 ${className}`}>{children}</div>;
}

export default CardContent;
