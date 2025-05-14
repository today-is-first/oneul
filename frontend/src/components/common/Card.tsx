// components/ui/card.tsx
import { ReactNode } from "react";

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-neutral-800 text-white shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
