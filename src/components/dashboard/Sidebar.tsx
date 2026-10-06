"use client";

import { useEffect, useRef, useState } from "react";
import { FIELDS, useApp } from "@/context/AppContext";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { logout, toggleSidebar, setSidebarOpen, setActiveView } from "@/store/appSlice";
import type { ActiveView } from "@/store/appSlice";
import { getFieldIcon, getNavIcon } from "@/lib/icons";
import { Sparkles, X, Settings, ChevronDown, Sun, Check, Moon, LogOut } from "lucide-react";

const NAV_ITEMS: { label: string; icon: string; id: ActiveView | string }[] = [
  { label: "My Board", icon: "dashboard", id: "board" },
  { label: "Archive", icon: "archive", id: "archive" },
  { label: "Settings", icon: "settings", id: "settings" },
];

export default function Sidebar() {
  const currentField = useAppSelector((state) => state.app.currentField);
  const isSidebarOpen = useAppSelector((state) => state.app.isSidebarOpen);
  const activeView = useAppSelector((state) => state.app.activeView);
  const dispatch = useAppDispatch();
  const { isDarkMode, toggleDarkMode } = useApp();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const fieldMeta = FIELDS.find((f) => f.id === currentField);
  const displayField = fieldMeta ?? { title: "Workspace", icon: "grid_view" };

  useEffect(() => {
    if (window.innerWidth < 768) {
      dispatch(setSidebarOpen(false));
    } else {
      dispatch(setSidebarOpen(true));
    }
  }, [dispatch]);

  // Close settings dropdown on outside click
  useEffect(() => {
    if (!settingsOpen) return;
    function handleOutside(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [settingsOpen]);

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className={[
          "fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm z-30 transition-opacity md:hidden",
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => dispatch(toggleSidebar())}
      />

      <aside
        className={[
          "flex flex-col bg-white dark:bg-[#0a0a14] border-r border-[#cbc3d7]/30 dark:border-white/8 transition-all duration-300 overflow-hidden flex-shrink-0 z-50",
          "fixed inset-y-0 left-0 md:relative h-full",
          isSidebarOpen
            ? "w-64 md:w-56 translate-x-0 opacity-100"
            : "w-64 md:w-0 -translate-x-full md:translate-x-0 md:opacity-0 md:pointer-events-none",
        ].join(" ")}
      >
        <div className="flex flex-col h-full p-2 sm:p-3 gap-3 sm:gap-4 min-w-[224px] overflow-y-auto">
          {/* Mobile-only top bar: brand + close button */}
          <div className="flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-violet-400" fill="currentColor" />
              <span className="text-[#0d1c2d] dark:text-white font-bold text-base tracking-tight">
                Kanbly
              </span>
            </div>
            <button
              onClick={() => dispatch(toggleSidebar())}
              aria-label="Close sidebar"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-[#494454] dark:text-white/50 hover:text-[#6b38d4] dark:hover:text-white hover:bg-[#f0f0f5] dark:hover:bg-white/10 transition-all duration-200"
            >
              <X size={20} />
            </button>
          </div>
          {/* User Profile */}
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-2xl bg-[#f8f9ff] dark:bg-white/5 border border-[#cbc3d7]/30 dark:border-white/8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
              {(() => {
                const FieldIcon = getFieldIcon(displayField.icon);
                return <FieldIcon size={18} className="text-white" fill="currentColor" />;
              })()}
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
            {NAV_ITEMS.map((item) => {
              const isViewItem = item.id === "board" || item.id === "archive";
              const isActive = isViewItem && activeView === item.id;

              // Settings item: renders a dropdown trigger instead of a link
              if (item.id === "settings") {
                return (
                  <div key="settings" ref={settingsRef} className="relative">
                    <button
                      onClick={() => setSettingsOpen((o) => !o)}
                      className={[
                        "w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        settingsOpen
                          ? "bg-[#e9ddff] dark:bg-violet-600/20 text-[#6b38d4] dark:text-violet-300"
                          : "text-[#494454] dark:text-white/50 hover:text-[#6b38d4] dark:hover:text-white hover:bg-[#e9ddff]/50 dark:hover:bg-white/8",
                      ].join(" ")}
                    >
                      <Settings size={18} />
                      <span className="flex-1 text-left truncate">Settings</span>
                      <ChevronDown
                        className="transition-transform duration-200"
                        size={16}
                        style={{ transform: settingsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>

                    {/* Settings Dropdown */}
                    {settingsOpen && (
                      <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-white dark:bg-[#1a1a2e] border border-[#cbc3d7]/40 dark:border-white/10 rounded-xl shadow-xl dark:shadow-black/40 overflow-hidden">
                        {/* Theme section */}
                        <div className="px-3 pt-2.5 pb-1">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#494454]/60 dark:text-white/30 mb-1.5">Theme</p>
                          <div className="flex flex-col gap-0.5">
                            <button
                              onClick={() => { if (isDarkMode) toggleDarkMode(); setSettingsOpen(false); }}
                              className={[
                                "flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                                !isDarkMode
                                  ? "bg-[#e9ddff] dark:bg-violet-600/20 text-[#6b38d4] dark:text-violet-300"
                                  : "text-[#494454] dark:text-white/60 hover:bg-[#f8f5ff] dark:hover:bg-white/8 hover:text-[#6b38d4] dark:hover:text-white",
                              ].join(" ")}
                            >
                              <Sun size={16} />
                              <span>Light</span>
                              {!isDarkMode && (
                                <Check size={14} className="ml-auto" />
                              )}
                            </button>

                            <button
                              onClick={() => { if (!isDarkMode) toggleDarkMode(); setSettingsOpen(false); }}
                              className={[
                                "flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                                isDarkMode
                                  ? "bg-[#e9ddff] dark:bg-violet-600/20 text-[#6b38d4] dark:text-violet-300"
                                  : "text-[#494454] dark:text-white/60 hover:bg-[#f8f5ff] dark:hover:bg-white/8 hover:text-[#6b38d4] dark:hover:text-white",
                              ].join(" ")}
                            >
                              <Moon size={16} />
                              <span>Dark</span>
                              {isDarkMode && (
                                <Check size={14} className="ml-auto" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="h-2" />
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={item.id}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (isViewItem) {
                      dispatch(setActiveView(item.id as ActiveView));
                    }
                  }}
                  className={[
                    "flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#e9ddff] dark:bg-violet-600/20 text-[#6b38d4] dark:text-violet-300 border border-transparent dark:border-violet-500/20"
                      : "text-[#494454] dark:text-white/50 hover:text-[#6b38d4] dark:hover:text-white hover:bg-[#e9ddff]/50 dark:hover:bg-white/8",
                  ].join(" ")}
                >
                  {(() => {
                    const NavIcon = getNavIcon(item.icon);
                    return <NavIcon size={18} />;
                  })()}
                  <span className="truncate">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => dispatch(logout())}
              className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-sm font-medium text-[#ba1a1a] dark:text-white/40 hover:bg-[#ffdad6] dark:hover:bg-red-500/10 transition-all duration-200 mt-auto"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
