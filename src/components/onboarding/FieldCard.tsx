"use client";

import { CheckCircle2 } from "lucide-react";
import { getFieldIcon } from "@/lib/icons";

interface FieldCardProps {
  title: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function FieldCard({
  title,
  icon,
  isSelected,
  onClick,
}: FieldCardProps) {
  const IconComponent = getFieldIcon(icon);

  return (
    <div
      onClick={onClick}
      className={[
        "relative flex flex-col items-center justify-center gap-2 rounded-2xl p-5 cursor-pointer select-none",
        "border transition-all duration-300",
        isSelected
          ? "bg-white dark:bg-gradient-to-br dark:from-violet-600/30 dark:to-indigo-600/20 border-[#6b38d4] dark:border-violet-400/60 shadow-[0_8px_24px_rgba(107,56,212,0.15)] dark:shadow-lg dark:shadow-violet-500/20 scale-[1.03]"
          : "bg-white/50 dark:bg-white/5 border-[#cbc3d7]/30 dark:border-white/10 hover:bg-white hover:border-[#cbc3d7]/60 dark:hover:bg-white/10 dark:hover:border-white/25 hover:scale-[1.02]",
      ].join(" ")}
    >
      {/* Selection check */}
      {isSelected && (
        <div className="absolute top-2.5 right-2.5 text-[#6b38d4] dark:text-violet-300">
            <CheckCircle2 size={18} fill="currentColor" />
        </div>
      )}

      <IconComponent
        size={30}
        className={[
          "transition-colors duration-300",
          isSelected ? "text-[#6b38d4] dark:text-violet-300" : "text-[#8f889d] dark:text-white/60",
        ].join(" ")}
      />

      <span
        className={[
          "text-sm font-semibold transition-colors duration-300",
          isSelected ? "text-[#0d1c2d] dark:text-white" : "text-[#494454] dark:text-white/70",
        ].join(" ")}
      >
        {title}
      </span>

      {/* Bottom accent bar */}
      {isSelected && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 rounded-full bg-[#6b38d4] dark:bg-gradient-to-r dark:from-violet-400 dark:to-indigo-400" />
      )}
    </div>
  );
}
