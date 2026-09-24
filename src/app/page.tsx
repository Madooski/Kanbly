"use client";

import { useAppSelector } from "@/store/hooks";
import Onboarding from "@/components/onboarding/Onboarding";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  const currentField = useAppSelector((state) => state.app.currentField);

  return currentField ? <Dashboard /> : <Onboarding />;
}
