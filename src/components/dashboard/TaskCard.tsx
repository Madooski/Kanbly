"use client";

import { useState, useRef, useEffect } from "react";
import type { TaskCard as TaskCardType, TaskStatus } from "@/types";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectColumnLabels } from "@/store/appSlice";
import { moveTaskStatus, archiveTask } from "@/store/tasksSlice";
import { enqueuePendingDelete, enqueueToast } from "@/store/uiSlice";
import { relativeTimeString } from "@/utils/time";
import { fireConfetti } from "@/utils/confetti";

// Tag colour map — expand as new tags are introduced
const TAG_COLOURS: Record<string, string> = {
  // Marketer
  CONTENT: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300 border-transparent dark:border-violet-500/30",
  STRATEGY: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300 border-transparent dark:border-cyan-500/30",
  SOCIAL: "bg-[#DCFCE7] dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300 border-transparent dark:border-emerald-500/30",
  EMAIL: "bg-[#FEF3C7] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300 border-transparent dark:border-amber-500/30",
  // Freelancer
  PROPOSAL: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300 border-transparent dark:border-violet-500/30",
  OUTREACH: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300 border-transparent dark:border-cyan-500/30",
  CONTRACT: "bg-[#FEF3C7] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300 border-transparent dark:border-amber-500/30",
  "FINAL DELIVERY": "bg-[#DCFCE7] dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300 border-transparent dark:border-emerald-500/30",
  // Founder
  MARKETING: "bg-[#FEE2E2] dark:bg-rose-500/20 text-[#B91C1C] dark:text-rose-300 border-transparent dark:border-rose-500/30",
  PRODUCT: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300 border-transparent dark:border-cyan-500/30",
  // Student
  PHYSICS: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300 border-transparent dark:border-cyan-500/30",
  HISTORY: "bg-[#FEF3C7] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300 border-transparent dark:border-amber-500/30",
  CS: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300 border-transparent dark:border-violet-500/30",
  CHEMISTRY: "bg-[#DCFCE7] dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300 border-transparent dark:border-emerald-500/30",
  // HR/Ops
  "IT OPS": "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300 border-transparent dark:border-cyan-500/30",
  SUPPORT: "bg-[#FEF3C7] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300 border-transparent dark:border-amber-500/30",
  RECRUITING: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300 border-transparent dark:border-violet-500/30",
  PAYROLL: "bg-[#DCFCE7] dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300 border-transparent dark:border-emerald-500/30",
  // Developer
  BUG: "bg-[#FEE2E2] dark:bg-rose-500/20 text-[#B91C1C] dark:text-rose-300 border-transparent dark:border-rose-500/30",
  FEATURE: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300 border-transparent dark:border-violet-500/30",
  BACKEND: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300 border-transparent dark:border-cyan-500/30",
};

function tagClass(tag: string) {
  return (
    TAG_COLOURS[tag.toUpperCase()] ??
    "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/60 border-transparent dark:border-white/10"
  );
}

function buildTimeLabel(
  status: TaskCardType["status"],
  dueDate: string,
  scheduledLabel: string
): string {
  if (status === "scheduled") {
    const isPast = new Date(dueDate) < new Date();
    if (isPast) {
      return `${scheduledLabel} ${relativeTimeString(dueDate, "ago")}`;
    }
  }
  return `Due ${relativeTimeString(dueDate)}`;
}

function getNextStep(
  status: TaskStatus,
  labels: { drafting: string; review: string; scheduled: string }
): { nextStatus: TaskStatus; nextLabel: string } | null {
  if (status === "drafting") return { nextStatus: "review", nextLabel: labels.review };
  if (status === "review") return { nextStatus: "scheduled", nextLabel: labels.scheduled };
  return null;
}

interface TaskCardProps {
  card: TaskCardType;
  showArchiveMenu?: boolean;
}

export default function TaskCard({ card, showArchiveMenu = false }: TaskCardProps) {
  const labels = useAppSelector(selectColumnLabels);
  const dispatch = useAppDispatch();
  const timeLabel = buildTimeLabel(card.status, card.dueDate, labels.scheduled);
  const next = getNextStep(card.status, labels);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <div className="relative group bg-white dark:bg-white/5 hover:bg-[#FAFBFC] dark:hover:bg-white/8 border border-[#E2E8F0] dark:border-white/10 dark:hover:border-white/20 rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200 shadow-sm dark:shadow-none hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-[2px] cursor-pointer">

      {/* Top-right controls: three-dot menu (last col) OR delete button */}
      {showArchiveMenu ? (
        <div ref={menuRef} className="absolute top-2.5 right-2.5">
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpen((o) => !o); }}
            aria-label="Card options"
            className="
              opacity-100 sm:opacity-0 sm:group-hover:opacity-100
              transition-opacity duration-200
              w-[22px] h-[22px] rounded-full
              flex items-center justify-center
              bg-[#f0f0f5] hover:bg-[#e2dff0] dark:bg-white/10 dark:hover:bg-white/20
              text-[#718096] dark:text-white/50
              text-[15px] font-bold leading-none select-none
            "
          >
            ⋯
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-7 z-50 min-w-[120px] bg-white dark:bg-[#1a1a2e] border border-[#E2E8F0] dark:border-white/10 rounded-xl shadow-xl dark:shadow-black/40 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  dispatch(archiveTask(card.id));
                  dispatch(enqueueToast({
                    id: crypto.randomUUID(),
                    message: "Moved to Archive",
                    icon: "archive",
                    iconColor: "text-slate-400 dark:text-slate-500",
                  }));
                }}
                className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-[13px] font-medium text-[#494454] dark:text-white/70 hover:bg-[#f8f5ff] dark:hover:bg-violet-500/10 hover:text-[#6b38d4] dark:hover:text-violet-300 transition-colors duration-150"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>archive</span>
                Archive
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Delete button — non-last columns */
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(enqueuePendingDelete({ id: card.id, title: card.title }));
          }}
          aria-label="Delete task"
          className="
            absolute top-2.5 right-2.5
            opacity-100 sm:opacity-0 sm:group-hover:opacity-100
            transition-opacity duration-200
            w-[22px] h-[22px] rounded-full
            flex items-center justify-center
            bg-red-500/10 hover:bg-red-500/20
            text-red-400 hover:text-red-500
            text-[14px] font-bold leading-none
          "
        >
          ×
        </button>
      )}

      {/* Header: tag */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${tagClass(card.tag)}`}
        >
          {card.tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[#1A202C] dark:text-white font-bold text-[15px] leading-snug">
        {card.title}
      </h3>

      {/* Description */}
      {card.description && (
        <p className="text-[#718096] dark:text-white/50 text-[13px] leading-relaxed line-clamp-2">
          {card.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        {/* Left side: Comments and Move button */}
        <div className="flex items-center gap-4">
          {/* Comment count */}
          <span className="flex items-center gap-1 text-[#A0AEC0] dark:text-white/40 text-xs font-semibold">
            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>
              chat_bubble
            </span>
            {card.comments}
          </span>

          {/* Move Button */}
          {next && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(moveTaskStatus({ id: card.id, status: next.nextStatus }));
                if (next.nextStatus === "scheduled") {
                  fireConfetti();
                  dispatch(enqueueToast({
                    id: crypto.randomUUID(),
                    message: `Task completed!`,
                    icon: "check_circle",
                    iconColor: "text-emerald-400 dark:text-emerald-500",
                  }));
                }
              }}
              className="flex items-center gap-0.5 text-[11px] font-semibold text-[#A0AEC0] dark:text-white/30 hover:text-[#6b38d4] dark:hover:text-violet-400 transition-colors duration-200"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>arrow_forward</span>
              {next.nextLabel}
            </button>
          )}
        </div>

        {/* Time label */}
        <span className="flex items-center gap-1 text-[#A0AEC0] dark:text-white/40 text-xs font-semibold">
          <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>
            schedule
          </span>
          {timeLabel}
        </span>
      </div>
    </div>
  );
}
