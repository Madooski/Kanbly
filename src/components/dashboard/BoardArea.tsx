"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectColumnLabels } from "@/store/appSlice";
import BoardColumn from "./BoardColumn";
import AddTaskModal from "./AddTaskModal";
import type { BoardColumnData } from "@/types";
import { LayoutDashboard, Plus } from "lucide-react";

//TODO: replace with tasksSlice data

export default function BoardArea() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const labels = useAppSelector(selectColumnLabels);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Exclude archived and planning tasks from the active board view
  const activeTasks = tasks.filter((t) => t.stage !== "archived" && t.status !== "planning");

  const columns: BoardColumnData[] = [
    {
      title: labels.drafting,
      cards: activeTasks.filter((t) => t.status === "drafting"),
      count: activeTasks.filter((t) => t.status === "drafting").length,
    },
    {
      title: labels.review,
      cards: activeTasks.filter((t) => t.status === "review"),
      count: activeTasks.filter((t) => t.status === "review").length,
    },
    {
      title: labels.scheduled,
      cards: activeTasks.filter((t) => t.status === "scheduled"),
      count: activeTasks.filter((t) => t.status === "scheduled").length,
    },
  ];

  return (
    <>
      {activeTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 h-full opacity-80 text-center px-6">
          <div className="w-20 h-20 bg-[#f0f2f8] dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
            <LayoutDashboard size={36} className="text-violet-400 dark:text-violet-500" />
          </div>
          <h2 className="text-xl font-bold text-[#0d1c2d] dark:text-white mb-2">
            Your board is empty
          </h2>
          <p className="text-[#494454] dark:text-white/50 text-sm max-w-sm mb-8">
            You don't have any tasks in this workspace yet. Create a new task to get started!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#6b38d4] hover:bg-[#5516be] transition-all duration-200 shadow-[0_4px_12px_rgba(107,56,212,0.2)] hover:-translate-y-[1px]"
          >
            <Plus size={18} />
            Create New Task
          </button>
        </div>
      ) : (
        <div className="flex gap-5 overflow-x-auto pb-4 mb-6 lg:mb-8 px-6 pt-6 flex-1 min-h-0 bg-[#FAFBFC] dark:bg-transparent snap-x snap-mandatory">
          {columns.map((col, idx) => (
            <BoardColumn
              key={idx}
              column={col}
              isFirstColumn={idx === 0}
              isLastColumn={idx === columns.length - 1}
              onAddTask={() => setIsModalOpen(true)}
            />
          ))}
        </div>
      )}

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
