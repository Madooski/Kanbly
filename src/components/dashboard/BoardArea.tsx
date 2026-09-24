"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectColumnLabels } from "@/store/appSlice";
import BoardColumn from "./BoardColumn";
import AddTaskModal from "./AddTaskModal";
import type { BoardColumnData } from "@/types";

//TODO: replace with tasksSlice data

export default function BoardArea() {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const labels = useAppSelector(selectColumnLabels);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: BoardColumnData[] = [
    {
      title: labels.drafting,
      cards: tasks.filter((t) => t.status === "drafting"),
      count: tasks.filter((t) => t.status === "drafting").length,
    },
    {
      title: labels.review,
      cards: tasks.filter((t) => t.status === "review"),
      count: tasks.filter((t) => t.status === "review").length,
    },
    {
      title: labels.scheduled,
      cards: tasks.filter((t) => t.status === "scheduled"),
      count: tasks.filter((t) => t.status === "scheduled").length,
    },
  ];

  return (
    <>
      <div className="flex gap-5 overflow-x-auto pb-4 mb-6 lg:mb-8 px-6 pt-6 flex-1 min-h-0 bg-[#FAFBFC] dark:bg-transparent snap-x snap-mandatory">
        {columns.map((col, idx) => (
          <BoardColumn
            key={idx}
            column={col}
            isFirstColumn={idx === 0}
            onAddTask={() => setIsModalOpen(true)}
          />
        ))}
      </div>

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
