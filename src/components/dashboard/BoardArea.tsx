"use client";

import type { BoardColumnData } from "@/types";
import BoardColumn from "./BoardColumn";

const COLUMNS: BoardColumnData[] = [
  {
    title: "DRAFTING",
    count: 2,
    cards: [
      {
        tag: "CONTENT",
        title: "Product launch blog post",
        desc: "Explaining the revolutionary new feature set for Q4 release with expert insights.",
        comments: 12,
        time: "2d",
      },
      {
        tag: "STRATEGY",
        title: "Q4 Video Content Map",
        desc: "Structuring the video series for YouTube Shorts and TikTok alignment.",
        comments: 4,
        time: "5d",
      },
    ],
  },
  {
    title: "IN REVIEW",
    count: 1,
    cards: [
      {
        tag: "SOCIAL",
        title: "LinkedIn Q4 Lead Gen Campaign",
        desc: "Finalizing the copy for the carousel ads targeting CMOs in mid-market SaaS.",
        comments: 8,
        time: "1h",
      },
    ],
  },
  {
    title: "SCHEDULED",
    count: 1,
    cards: [
      {
        tag: "EMAIL",
        title: "Monthly Insights Newsletter",
        desc: "Curation of the best blog posts from last month for the subscriber list.",
        comments: 2,
        time: "4/4",
      },
    ],
  },
];

export default function BoardArea() {
  return (
    <div className="flex gap-5 overflow-x-auto pb-4 px-6 pt-6 flex-1 min-h-0 bg-[#FAFBFC] dark:bg-transparent">
      {COLUMNS.map((col, idx) => (
        <BoardColumn key={idx} column={col} />
      ))}
    </div>
  );
}
