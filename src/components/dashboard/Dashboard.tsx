"use client";

import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import BoardArea from "./BoardArea";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen bg-[#f8f9ff] text-[#0d1c2d] dark:bg-[#0d0d1a] dark:text-white overflow-hidden">
      {/* Top navbar spans full width */}
      <TopNavbar />

      {/* Body: sidebar + main content */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar />

        {/* Main content */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-white dark:bg-transparent lg:rounded-tl-3xl lg:mt-2 lg:mr-2 lg:mb-2 lg:shadow-[0_8px_32px_rgba(0,0,0,0.04)] lg:border lg:border-[#cbc3d7]/30 dark:lg:border-none dark:lg:rounded-none dark:lg:m-0 dark:lg:shadow-none transition-all duration-300">
          <TopHeader />
          <BoardArea />
        </div>
      </div>
    </div>
  );
}
