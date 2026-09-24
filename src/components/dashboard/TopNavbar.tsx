"use client";

import { useApp } from "@/context/AppContext";
import { useAppDispatch } from "@/store/hooks";
import { toggleSidebar, logout } from "@/store/appSlice";

export default function TopNavbar() {
  const { isDarkMode, toggleDarkMode } = useApp();
  const dispatch = useAppDispatch();

  return (
    <nav className="flex items-center justify-between px-4 h-16 border-b border-[#cbc3d7]/30 dark:border-white/8 bg-white dark:bg-[#0f0f1a]/80 backdrop-blur-sm flex-shrink-0 z-20">
      {/* Left: menu toggle + brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-[#0d1c2d] dark:text-white/60 dark:hover:text-white hover:bg-[#f0f0f5] dark:hover:bg-white/10 transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>
            menu
          </span>
        </button>

        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-violet-400"
            style={{ fontVariationSettings: "'FILL' 1", fontSize: "22px" }}
          >
            auto_awesome
          </span>
          <span className="text-[#0d1c2d] dark:text-white font-bold text-lg tracking-tight">
            Kaban{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Smart
            </span>
          </span>
        </div>
      </div>

      {/* Center: search */}
      <div className="flex-1 max-w-sm mx-6">
        <div className="flex items-center gap-2 bg-[#f0f2f8] dark:bg-white/5 border border-transparent dark:border-white/10 rounded-xl px-3 py-2 focus-within:border-[#6b38d4]/50 dark:focus-within:border-violet-500/50 dark:focus-within:bg-white/8 transition-all duration-200">
          <span className="material-symbols-outlined text-[#494454] dark:text-white/30" style={{ fontSize: "18px" }}>
            search
          </span>
          <input
            type="text"
            placeholder="Search tasks or insights..."
            className="bg-transparent text-[#0d1c2d] dark:text-white text-sm placeholder-[#494454]/60 dark:placeholder-white/30 outline-none flex-1 min-w-0 font-medium"
          />
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#6b38d4] dark:border-white/10 text-[#6b38d4] dark:text-white/50 text-xs font-bold uppercase tracking-wider bg-[#e9ddff] dark:bg-transparent hover:bg-[#6b38d4] hover:text-white dark:hover:border-violet-500/40 dark:hover:bg-violet-500/10 transition-all duration-200 hover:shadow-[0_4px_12px_rgba(107,56,212,0.2)] dark:hover:shadow-none"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
            swap_horiz
          </span>
          <span className="hidden sm:inline">Change Field</span>
        </button>

        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl text-[#494454] dark:text-white/50 dark:hover:text-white hover:bg-[#f0f0f5] dark:hover:bg-white/10 hover:text-[#6b38d4] transition-all duration-200">
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
            notifications
          </span>
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-violet-400" />
        </button>

        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-[#494454] dark:text-white/50 dark:hover:text-white hover:bg-[#f0f0f5] dark:hover:bg-white/10 hover:text-[#6b38d4] transition-all duration-200"
          title="Toggle Dark Mode"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
            {isDarkMode ? "light_mode" : "dark_mode"}
          </span>
        </button>

        <button className="w-9 h-9 flex items-center justify-center rounded-xl text-[#494454] dark:text-white/50 dark:hover:text-white hover:bg-[#f0f0f5] dark:hover:bg-white/10 hover:text-[#6b38d4] transition-all duration-200">
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
            help
          </span>
        </button>

        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3SzNzGReXHQz56v-ziaRnrAr05sTDrvnFnsliZau3bv3JTm68A_a9AO8ldbtHO4gPCR3x3NCuJPkGEcZxCsSi5wn4cCkh2aOi7D0oVLXuWbvRY6iHsxfTWquOrGLMiSDb8AqtHAro6glb_TB3QBcW0sgjODs832os19_sMNzInWzWWmbtgMvX1BAhOWlLw2oBuqrM-syKmakBugan3Ckay2onO96MPmr8QlwDiZ4lAyAq3xrnocDlrEVJfo2ZcaTbAQWDWIHohX7c"
          alt="User avatar"
          className="w-9 h-9 rounded-full object-cover border-2 border-[#e9ddff] dark:border-violet-500/40 cursor-pointer hover:border-[#6b38d4] dark:hover:border-violet-400 transition-all duration-200"
        />
      </div>
    </nav>
  );
}
