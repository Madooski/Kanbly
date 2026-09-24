"use client";

import { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addTask } from "@/store/tasksSlice";
import { SEED_TASKS } from "@/config/seedTasks";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function todayPlusOne(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const dispatch = useAppDispatch();
  const currentField = useAppSelector((state) => state.app.currentField);

  // Derive role-scoped tags from seed data
  const roleTags: string[] = currentField
    ? [...new Set(SEED_TASKS[currentField].map((t) => t.tag))]
    : [];

  // Form state
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(todayPlusOne());

  const titleRef = useRef<HTMLInputElement>(null);

  // Reset form and focus title whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setTag(roleTags[0] ?? "");
      setDescription("");
      setDueDate(todayPlusOne());
      // Delay focus so the modal has painted
      setTimeout(() => titleRef.current?.focus(), 50);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const canSubmit = title.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    dispatch(
      addTask({
        title: title.trim(),
        tag: tag || (roleTags[0] ?? "Task"),
        description: description.trim(),
        dueDate: dueDate
          ? new Date(dueDate).toISOString()
          : new Date().toISOString(),
      })
    );
    onClose();
  }

  if (!isOpen) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-md bg-white dark:bg-[#0f0f1a] border border-[#cbc3d7]/30 dark:border-white/10 rounded-3xl shadow-[0_32px_80px_-12px_rgba(0,0,0,0.18)] dark:shadow-[0_32px_80px_-12px_rgba(0,0,0,0.6)] p-7 flex flex-col gap-5 animate-[scaleIn_0.2s_cubic-bezier(0.16,1,0.3,1)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-violet-500"
              style={{ fontVariationSettings: "'FILL' 1", fontSize: "20px" }}
            >
              add_task
            </span>
            <h2 className="text-[#0d1c2d] dark:text-white font-bold text-[17px]">
              New Task
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-[#494454] dark:text-white/40 hover:text-[#0d1c2d] dark:hover:text-white hover:bg-[#f0f0f5] dark:hover:bg-white/10 transition-all duration-200"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              close
            </span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#494454] dark:text-white/50">
              Title <span className="text-rose-400">*</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full px-4 py-2.5 rounded-xl bg-[#f8f9ff] dark:bg-white/5 border border-[#cbc3d7]/40 dark:border-white/10 text-[#0d1c2d] dark:text-white text-sm placeholder-[#A0AEC0] dark:placeholder-white/30 outline-none focus:border-violet-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-400/20 transition-all duration-200"
              required
            />
          </div>

          {/* Tag */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#494454] dark:text-white/50">
              Tag
            </label>
            <div className="relative">
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full appearance-none px-4 py-2.5 pr-9 rounded-xl bg-[#f8f9ff] dark:bg-[#1a1a2e] border border-[#cbc3d7]/40 dark:border-white/10 text-[#0d1c2d] dark:text-white text-sm outline-none focus:border-violet-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-400/20 transition-all duration-200 cursor-pointer"
              >
                {roleTags.length === 0 ? (
                  <option disabled value="">
                    No tags available
                  </option>
                ) : (
                  roleTags.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))
                )}
              </select>
              <span
                className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0] dark:text-white/30 pointer-events-none"
                style={{ fontSize: "16px" }}
              >
                expand_more
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#494454] dark:text-white/50">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some context (optional)..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-[#f8f9ff] dark:bg-white/5 border border-[#cbc3d7]/40 dark:border-white/10 text-[#0d1c2d] dark:text-white text-sm placeholder-[#A0AEC0] dark:placeholder-white/30 outline-none focus:border-violet-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-400/20 transition-all duration-200 resize-none"
            />
          </div>

          {/* Due Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#494454] dark:text-white/50">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#f8f9ff] dark:bg-white/5 border border-[#cbc3d7]/40 dark:border-white/10 text-[#0d1c2d] dark:text-white text-sm outline-none focus:border-violet-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-violet-400/20 transition-all duration-200"
            />
          </div>

          {/* Known limitation note */}
          <p className="text-[11px] text-[#A0AEC0] dark:text-white/30 leading-relaxed">
            ⚠ Tasks are in-memory only — a page refresh will reset the board to seed data. Persistence coming in a later step.
          </p>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#cbc3d7]/40 dark:border-white/10 text-[#494454] dark:text-white/50 text-sm font-semibold hover:bg-[#f0f0f5] dark:hover:bg-white/8 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!canSubmit}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#6b38d4] text-white text-sm font-bold hover:bg-[#5516be] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_4px_12px_rgba(107,56,212,0.3)] hover:shadow-[0_6px_16px_rgba(107,56,212,0.4)] hover:-translate-y-[1px] disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
