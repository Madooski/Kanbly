"use client";

import { useMemo } from "react";
import type { TaskCard } from "@/types";
import { selectColumnLabels } from "@/store/appSlice";
import { selectAllTasks } from "@/store/tasksSlice";
import { useAppSelector } from "@/store/hooks";
import { SearchX } from "lucide-react";

interface SearchResultsProps {
  query: string;
}

function taskLocation(
  task: TaskCard,
  labels: { drafting: string; review: string; scheduled: string }
) {
  if (task.stage === "archived") return "Archived";
  if (task.status === "planning") return "Planning";
  return `In ${labels[task.status]}`;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const tasks = useAppSelector(selectAllTasks);
  const labels = useAppSelector(selectColumnLabels);
  const matchingTasks = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase();
    return tasks.filter((task) =>
      task.title.toLocaleLowerCase().includes(normalizedQuery) ||
      task.tag.toLocaleLowerCase().includes(normalizedQuery)
    );
  }, [query, tasks]);

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-y-auto px-6 py-6 lg:px-12 lg:py-8 bg-[#FAFBFC] dark:bg-transparent">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#1A202C] dark:text-white tracking-tight">
          Search Results
        </h1>
        <p className="mt-1 text-sm text-[#718096] dark:text-white/50">
          Results for “{query}”
        </p>
      </div>

      {matchingTasks.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <SearchX size={36} className="text-[#A0AEC0] dark:text-white/30" />
          <h2 className="mt-4 text-lg font-bold text-[#1A202C] dark:text-white">No tasks found</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-w-3xl">
          {matchingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] dark:border-white/10 bg-white dark:bg-white/5 px-5 py-4 shadow-sm dark:shadow-none"
            >
              <div className="min-w-0">
                <h2 className="truncate text-[15px] font-bold text-[#1A202C] dark:text-white">
                  {task.title}
                </h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#718096] dark:text-white/50">
                  {task.tag}
                </p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-[#6B38D4] dark:text-violet-300">
                {taskLocation(task, labels)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}