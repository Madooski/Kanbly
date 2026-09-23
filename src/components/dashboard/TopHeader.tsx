"use client";

import { useState } from "react";

const TABS = [
  { label: "Planning", count: 4 },
  { label: "Active", count: 4 },
  { label: "Published", count: 3 },
];

export default function TopHeader() {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <div className="flex items-center justify-between px-6 py-4 lg:px-12 lg:pt-4 lg:pb-2 border-b border-[#cbc3d7]/30 dark:border-white/8 bg-[#FAFBFC] dark:bg-transparent lg:rounded-tr-3xl flex-shrink-0">
      {/* Board title */}
      <h1 className="text-2xl font-extrabold text-[#1A202C] dark:text-white tracking-tight">
        Strategic Canvas
      </h1>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-transparent dark:bg-white/5 rounded-xl p-1">
        {TABS.map((tab) => {
          const isActive = tab.label === activeTab;
          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={[
                "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex gap-1.5 items-center",
                isActive
                  ? "bg-[#6B38D4] text-white dark:bg-white/15 dark:shadow-sm"
                  : "text-[#718096] dark:text-white/40 hover:bg-[#EDEEF3] dark:hover:bg-transparent hover:text-[#1A202C] dark:hover:text-white/70",
              ].join(" ")}
            >
              {tab.label}{" "}
              <span
                className={[
                  "text-xs font-medium opacity-80",
                  isActive ? "text-white/80 dark:text-white/60" : "text-[#A0AEC0] dark:text-white/30",
                ].join(" ")}
              >
                ({tab.count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
