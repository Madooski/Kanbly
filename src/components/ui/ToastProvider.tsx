"use client";

import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { cancelPendingDelete, commitPendingDelete, removeToast } from "@/store/uiSlice";
import { deleteTask } from "@/store/tasksSlice";
import { Trash2, Archive, CheckCircle2 } from "lucide-react";

const TOAST_ICONS: Record<string, any> = {
  archive: Archive,
  check_circle: CheckCircle2,
  delete: Trash2,
};

const GRACE_MS = 4000;

export default function ToastProvider() {
  const dispatch = useAppDispatch();
  const pendingDeletes = useAppSelector((s) => s.ui.pendingDeletes);
  const toasts = useAppSelector((s) => s.ui.toasts);
  
  // Map of task id → timeout id
  const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const toastTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    pendingDeletes.forEach(({ id }) => {
      if (!timers.current.has(id)) {
        const timer = setTimeout(() => {
          timers.current.delete(id);
          dispatch(commitPendingDelete(id));
          dispatch(deleteTask(id));
        }, GRACE_MS);
        timers.current.set(id, timer);
      }
    });

    // Clean up timers for items that were cancelled (undo pressed)
    timers.current.forEach((timer, id) => {
      if (!pendingDeletes.find((d) => d.id === id)) {
        clearTimeout(timer);
        timers.current.delete(id);
      }
    });
  }, [pendingDeletes, dispatch]);

  // Effect for generic toasts
  useEffect(() => {
    toasts.forEach(({ id }) => {
      if (!toastTimers.current.has(id)) {
        const timer = setTimeout(() => {
          toastTimers.current.delete(id);
          dispatch(removeToast(id));
        }, 3000);
        toastTimers.current.set(id, timer);
      }
    });
  }, [toasts, dispatch]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      timers.current.forEach((t) => clearTimeout(t));
      toastTimers.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  if (pendingDeletes.length === 0 && toasts.length === 0) return null;

  return (
    <div
      className="fixed top-[68px] left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none"
      aria-live="polite"
    >
      {pendingDeletes.map(({ id, title }) => (
        <div
          key={id}
          className="
            pointer-events-auto
            flex items-center gap-3
            bg-[#1A202C] dark:bg-[#E2E8F0]
            text-white dark:text-[#1A202C]
            text-[13px] font-semibold
            px-4 py-3 rounded-2xl
            shadow-xl shadow-black/20
            animate-[slideDown_0.2s_ease-out]
            min-w-[260px] max-w-[340px]
          "
        >
          {/* Icon */}
          <Trash2 size={18} className="text-red-400 dark:text-red-500 shrink-0" />

          {/* Message */}
          <span className="flex-1 truncate">
            <span className="opacity-60 font-normal">Deleted </span>
            &ldquo;{title}&rdquo;
          </span>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl overflow-hidden">
            <div
              className="h-full bg-violet-500 dark:bg-violet-400 origin-left"
              style={{
                animation: `shrinkWidth ${GRACE_MS}ms linear forwards`,
              }}
            />
          </div>

          {/* Undo button */}
          <button
            onClick={() => dispatch(cancelPendingDelete(id))}
            className="
              shrink-0 text-violet-400 dark:text-violet-600
              hover:text-violet-300 dark:hover:text-violet-500
              font-bold text-[13px]
              transition-colors duration-150
              underline underline-offset-2
            "
          >
            Undo
          </button>
        </div>
      ))}

      {toasts.map(({ id, message, icon, iconColor }) => (
        <div
          key={id}
          className="
            pointer-events-auto
            flex items-center gap-3
            bg-[#1A202C] dark:bg-[#E2E8F0]
            text-white dark:text-[#1A202C]
            text-[13px] font-semibold
            px-4 py-3 rounded-2xl
            shadow-xl shadow-black/20
            animate-[slideDown_0.2s_ease-out]
            min-w-[260px] max-w-[340px]
          "
        >
          {icon && TOAST_ICONS[icon] && (
            (() => {
              const IconComp = TOAST_ICONS[icon];
              return (
                <IconComp 
                  size={18} 
                  className={`shrink-0 ${iconColor || 'text-violet-400 dark:text-violet-500'}`} 
                />
              );
            })()
          )}
          <span className="flex-1 truncate">
            {message}
          </span>
        </div>
      ))}
    </div>
  );
}
