"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}

export default function Button({
  children,
  disabled,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[#6b38d4] dark:bg-gradient-to-r dark:from-violet-600 dark:to-indigo-600 text-white shadow-[0_8px_24px_rgba(107,56,212,0.25)] dark:shadow-lg dark:shadow-violet-500/25 hover:shadow-[0_12px_28px_rgba(107,56,212,0.4)] dark:hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-[0.98] focus:ring-[#6b38d4] dark:focus:ring-violet-500",
    ghost:
      "bg-black/5 dark:bg-white/10 text-[#0d1c2d] dark:text-white border border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 focus:ring-black/20 dark:focus:ring-white/30",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      <ArrowRight size={18} />
    </button>
  );
}
