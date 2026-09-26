"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { loadState } from "@/store/store";
import Onboarding from "@/components/onboarding/Onboarding";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  const currentField = useAppSelector((state) => state.app.currentField);
  const dispatch = useAppDispatch();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      dispatch({ type: 'HYDRATE_STATE', payload: savedState });
    }
    setIsHydrated(true);
  }, [dispatch]);

  // Loading guard to prevent onboarding flash
  if (!isHydrated) {
    return <div className="min-h-screen bg-[#f8f9ff] dark:bg-[#0d0d1a]" />;
  }

  return currentField ? <Dashboard /> : <Onboarding />;
}
