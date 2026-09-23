"use client";

import { useApp } from "@/context/AppContext";
import Onboarding from "@/components/onboarding/Onboarding";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  const { currentField } = useApp();

  return currentField ? <Dashboard /> : <Onboarding />;
}
