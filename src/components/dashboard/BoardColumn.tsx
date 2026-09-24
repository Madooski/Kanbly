"use client";

import type { BoardColumnData } from "@/types";
import TaskCard from "./TaskCard";

interface BoardColumnProps {
  column: BoardColumnData;
  isFirstColumn?: boolean;
  onAddTask: () => void;
}

export default function BoardColumn({ column, isFirstColumn, onAddTask }: BoardColumnProps) {
  return (
    <div className="flex flex-col gap-3 min-w-[300px] flex-1">
      {/* Column Header */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-[13px] font-extrabold tracking-[0.05em] uppercase text-[#A0AEC0] dark:text-white/50">
          {column.title}
        </span>
        <span className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#E2E8F0] dark:bg-white/10 text-[#4A5568] dark:text-white/60 text-[12px] font-bold">
          {column.count}
        </span>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {column.cards.map((card) => (
          <TaskCard key={card.id} card={card} />
        ))}

        {/* Inline create button — first column only, since new tasks always land in drafting */}
        {isFirstColumn && (
          <button
            onClick={onAddTask}
            className="flex items-center justify-center gap-2 w-full px-4 py-4 mt-2 rounded-2xl border-none text-[#A0AEC0] dark:text-white/30 text-[13px] font-semibold hover:text-[#718096] dark:hover:text-violet-300/60 dark:hover:bg-violet-500/5 transition-all duration-200"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              add
            </span>
            Create New Task
          </button>
        )}
      </div>
    </div>
  );
}
