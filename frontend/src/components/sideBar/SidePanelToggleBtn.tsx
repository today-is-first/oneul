import React from "react";

type Props = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
};

const SidePanelToggleButton = ({ icon, label, onClick }: Props) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className="h-17 w-17 flex flex-col items-center justify-center rounded-2xl px-2 py-2 transition hover:bg-[#1f1f25]"
    >
      <div className="flex items-center justify-center">{icon}</div>
      <span className="mt-1 max-w-[64px] truncate text-center text-xs text-gray-300">
        {label}
      </span>
    </button>
  );
};

export default SidePanelToggleButton;
