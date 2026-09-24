"use client";

import { FIELDS } from "@/context/AppContext";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/appSlice";

const NAV_ITEMS = [
  { label: "My Board", icon: "dashboard", id: "board" },
  { label: "Insights", icon: "insights", id: "insights" },
  { label: "Team", icon: "group", id: "team" },
  { label: "Archive", icon: "archive", id: "archive" },
  { label: "Settings", icon: "settings", id: "settings" },
];

export default function Sidebar() {
  const currentField = useAppSelector((state) => state.app.currentField);
  const isSidebarOpen = useAppSelector((state) => state.app.isSidebarOpen);
  const dispatch = useAppDispatch();

  const fieldMeta = FIELDS.find((f) => f.id === currentField);
  const displayField = fieldMeta ?? { title: "Workspace", icon: "grid_view" };

  return (
    <aside
      className={[
        "flex flex-col bg-white dark:bg-[#0a0a14] border-r border-[#cbc3d7]/30 dark:border-white/8 transition-all duration-300 overflow-hidden flex-shrink-0",
        isSidebarOpen ? "w-56" : "w-0 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="flex flex-col h-full p-3 gap-4 min-w-[224px]">
        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#f8f9ff] dark:bg-white/5 border border-[#cbc3d7]/30 dark:border-white/8">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <span
              className="material-symbols-outlined text-white"
              style={{ fontVariationSettings: "'FILL' 1", fontSize: "18px" }}
            >
              {displayField.icon}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[#0d1c2d] dark:text-white text-sm font-semibold truncate">
              Global Editor
            </span>
            <span className="text-[#494454] dark:text-white/40 text-xs truncate">
              {displayField.title}
            </span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-0.5 flex-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href="#"
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                item.id === "board"
                  ? "bg-[#e9ddff] dark:bg-violet-600/20 text-[#6b38d4] dark:text-violet-300 border border-transparent dark:border-violet-500/20"
                  : "text-[#494454] dark:text-white/50 hover:text-[#6b38d4] dark:hover:text-white hover:bg-[#e9ddff]/50 dark:hover:bg-white/8",
              ].join(" ")}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Footer Buttons */}
        <div className="flex flex-col gap-1.5">
          <button className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-[#6b38d4] hover:bg-[#5516be] dark:bg-transparent dark:justify-start dark:text-white/50 dark:hover:text-violet-300 dark:hover:bg-violet-500/10 transition-all duration-200 shadow-[0_4px_12px_rgba(107,56,212,0.2)] dark:shadow-none hover:-translate-y-[1px] dark:hover:translate-y-0">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              add
            </span>
            <span>New Insight</span>
          </button>

          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#ba1a1a] dark:text-white/40 hover:bg-[#ffdad6] dark:hover:bg-red-500/10 transition-all duration-200"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              logout
            </span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
