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
      className="flex w-full flex-col items-center justify-center py-2 transition hover:bg-[#1f1f25]"
    >
      {icon}
      <span className="mt-1 text-xs text-gray-300">{label}</span>
    </button>
  );
};

export default SidePanelToggleButton;
