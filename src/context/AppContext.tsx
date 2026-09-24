"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import type { Field, FieldId } from "@/types";

// ─── Constants ────────────────────────────────────────────────────────────────

export const FIELDS: Field[] = [
  { id: "student", title: "Student", icon: "school" },
  { id: "marketer", title: "Marketer", icon: "campaign" },
  { id: "hr", title: "HR/Ops", icon: "account_tree" },
  { id: "founder", title: "Founder", icon: "rocket_launch" },
  { id: "freelancer", title: "Freelancer", icon: "work" },
  { id: "developer", title: "Developer", icon: "terminal" },
];

// ─── Context Types ────────────────────────────────────────────────────────────

interface AppContextValue {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const value = useMemo(
    () => ({ isDarkMode, toggleDarkMode }),
    [isDarkMode]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
