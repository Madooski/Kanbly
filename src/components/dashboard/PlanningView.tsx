"use client";

import { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { moveTaskStatus } from "@/store/tasksSlice";
import { enqueuePendingDelete } from "@/store/uiSlice";

// Reuse the same tag colour map for consistency
const TAG_COLOURS: Record<string, string> = {
  CONTENT: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300",
  STRATEGY: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300",
  SOCIAL: "bg-[#DCFCE7] dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300",
  EMAIL: "bg-[#FEF3C7] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300",
  PROPOSAL: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300",
  OUTREACH: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300",
  CONTRACT: "bg-[#FEF3C7] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300",
  "FINAL DELIVERY": "bg-[#DCFCE7] dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300",
  MARKETING: "bg-[#FEE2E2] dark:bg-rose-500/20 text-[#B91C1C] dark:text-rose-300",
  PRODUCT: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300",
  PHYSICS: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300",
  HISTORY: "bg-[#FEF3C7] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300",
  CS: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300",
  CHEMISTRY: "bg-[#DCFCE7] dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300",
  "IT OPS": "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300",
  SUPPORT: "bg-[#FEF3C7] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300",
  RECRUITING: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300",
  PAYROLL: "bg-[#DCFCE7] dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300",
  BUG: "bg-[#FEE2E2] dark:bg-rose-500/20 text-[#B91C1C] dark:text-rose-300",
  FEATURE: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300",
  BACKEND: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300",
};

function tagClass(tag: string) {
  return (
    TAG_COLOURS[tag.toUpperCase()] ??
    "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/60"
  );
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

export default function PlanningView() {
  const allTasks = useAppSelector((state) => state.tasks.tasks);
  const dispatch = useAppDispatch();
  const planned = useMemo(
    () => allTasks.filter((t) => t.status === "planning" && t.stage !== "archived"),
    [allTasks]
  );

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden px-6 pt-6 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[#f0f2f8] dark:bg-white/5 flex items-center justify-center">
          <span
            className="material-symbols-outlined text-[#A0AEC0] dark:text-white/40"
            style={{ fontSize: "18px" }}
          >
            event_note
          </span>
        </div>
        <div>
          <h2 className="text-[#0d1c2d] dark:text-white font-bold text-base leading-tight">
            Planning
          </h2>
          <p className="text-[#A0AEC0] dark:text-white/40 text-xs">
            {planned.length} {planned.length === 1 ? "task" : "tasks"} planned
          </p>
        </div>
      </div>

      {planned.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center flex-1 opacity-70 text-center">
          <div className="w-16 h-16 bg-[#f0f2f8] dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl text-[#A0AEC0] dark:text-white/30">
              calendar_month
            </span>
          </div>
          <p className="text-[#718096] dark:text-white/40 text-sm font-medium">
            No tasks in planning
          </p>
          <p className="text-[#A0AEC0] dark:text-white/30 text-xs mt-1">
            Tasks in the planning stage will appear here.
          </p>
        </div>
      ) : (
        /* Flat list */
        <div className="flex flex-col overflow-y-auto gap-0 rounded-2xl border border-[#E2E8F0] dark:border-white/8 bg-white dark:bg-white/[0.03] shadow-sm dark:shadow-none divide-y divide-[#E2E8F0] dark:divide-white/6">
          {/* Column headings */}
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2.5 bg-[#f8f9ff] dark:bg-white/5 rounded-t-2xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#A0AEC0] dark:text-white/30">
              Title
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#A0AEC0] dark:text-white/30 text-center min-w-[72px]">
              Subject
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#A0AEC0] dark:text-white/30 text-right min-w-[96px]">
              Target Start
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#A0AEC0] dark:text-white/30 text-center w-[72px]">
              {/* Actions */}
            </span>
          </div>

          {planned.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-3.5 items-center hover:bg-[#fafbff] dark:hover:bg-white/[0.04] transition-colors duration-150 group"
            >
              {/* Title */}
              <span className="text-[#1A202C] dark:text-white/80 text-[13px] font-semibold truncate leading-snug">
                {item.title}
              </span>

              {/* Tag */}
              <span
                className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase min-w-[64px] text-center ${tagClass(item.tag)}`}
              >
                {item.tag}
              </span>

              {/* Date */}
              <span className="text-[#A0AEC0] dark:text-white/40 text-[12px] font-medium text-right whitespace-nowrap min-w-[96px]">
                {formatDate(item.targetStartDate)}
              </span>

              {/* Actions */}
              <div className="flex justify-end gap-1 w-[72px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(enqueuePendingDelete({ id: item.id, title: item.title }));
                  }}
                  title="Delete Task"
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "16px", fontWeight: "bold" }}>
                    close
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(moveTaskStatus({ id: item.id, status: 'drafting' }));
                  }}
                  title="Move to Active Board"
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400 dark:hover:bg-violet-500/20 transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                    play_arrow
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
