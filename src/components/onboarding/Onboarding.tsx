"use client";

import { useState, useEffect } from "react";
import { useApp, FIELDS } from "@/context/AppContext";
import { useAppDispatch } from "@/store/hooks";
import { setCurrentField } from "@/store/appSlice";
import { seedTasksForRole } from "@/store/tasksSlice";
import type { FieldId } from "@/types";
import FieldCard from "./FieldCard";
import WordReveal from "./WordReveal";
import { Sun, Moon, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Onboarding() {
  const { isDarkMode, toggleDarkMode } = useApp();
  const dispatch = useAppDispatch();
  const [selectedField, setSelectedField] = useState<FieldId | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleFieldClick = (id: FieldId) => {
    if (isCompleting) return;
    setSelectedField((prev) => (prev === id ? null : id));
  };

  const handleComplete = () => {
    if (!selectedField) return;
    setIsCompleting(true);
    setTimeout(() => {
      dispatch(seedTasksForRole(selectedField));
      dispatch(setCurrentField(selectedField));
    }, 1200);
  };

  const currentStep = !mounted ? 0 : isCompleting ? 3 : selectedField ? 2 : 1;
  const displayStep = isCompleting ? 3 : selectedField ? 2 : 1;
  const fillWidth = `${(currentStep / 3) * 100}%`;

  return (
    <div
      className={[
        "relative min-h-screen w-full flex overflow-hidden transition-opacity duration-500 bg-[#f8f9ff] dark:bg-[#0d0d1a]",
        isCompleting ? "opacity-0 pointer-events-none" : "opacity-100",
      ].join(" ")}
    >
      {/* ── Background image + gradient ── */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9t42OMXqkBwOiarI0QmEZJi403N9vp6aoaEI8huCMKOZLJAhdvYL7RatgdrJcx92GgtqLOqoVEdHdlBo2meP51R6K4aMj4LWUlUTwIdJ3r16_FNY9KR8xaEpeaTBUjeI00xglrrrGz8yVRjV5F8X18LIrwXo7MZj2H9Cfq6BxDKgYHWC4DpI7mRm-lLJhL6o9j-OFjk2SKbCyjWpP4L39JWQ1Ug3yvAS1bwRUjZtQ5oaEc2kT2HILI6jat6ljfLuORt-o8OcguLPM"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#f8f9ff] via-[#f8f9ff]/60 to-transparent dark:bg-gradient-to-r dark:from-[#0d0d1a] dark:via-[#0d0d1a]/85 dark:to-[#0d0d1a]/40" />
      </div>

      {/* ── Decorative blobs ── */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-violet-600/20 blur-[120px] z-0" />
      <div className="absolute bottom-[-10%] right-[20%] w-80 h-80 rounded-full bg-indigo-600/15 blur-[100px] z-0" />

      {/* ── Main Layout ── */}
      {/* Theme Toggle */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-[#cbc3d7]/30 dark:border-white/10 text-[#0d1c2d] dark:text-white/70 hover:scale-110 transition-all duration-300 shadow-sm dark:shadow-none"
        title="Toggle Theme"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <main className="relative z-10 flex flex-col lg:flex-row items-center justify-center w-full min-h-screen px-6 py-12 pt-24 lg:pt-12 gap-8 md:gap-12 max-w-6xl mx-auto">
        {/* Left: Copy */}
        <div className="flex-1 flex flex-col gap-4 md:gap-6 max-w-xl text-center lg:text-left items-center lg:items-start">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e9ddff] dark:bg-violet-500/10 border border-transparent dark:border-violet-500/30 text-[#5516be] dark:text-violet-300 text-xs font-bold tracking-widest uppercase">
            <Sparkles size={16} fill="currentColor" />
            Productivity Workspace
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-extrabold leading-[1.15] lg:leading-[1.1] tracking-tight text-[#0d1c2d] dark:text-white">
            <span className="overflow-hidden block">
              <span
                className="block animate-[slideUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]"
              >
                Tailor your
              </span>
            </span>
            <span className="overflow-hidden block">
              <span
                className="block animate-[slideUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.35s_both] text-[#6b38d4] dark:text-transparent dark:bg-gradient-to-r dark:from-violet-400 dark:to-indigo-400 dark:bg-clip-text"
              >
                productivity
              </span>
            </span>
            <span className="overflow-hidden block">
              <span
                className="block animate-[slideUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.5s_both]"
              >
                experience.
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#494454] dark:text-white/60 text-[18px] leading-[1.625] max-w-md animate-[fadeIn_0.8s_0.6s_both]">
            <WordReveal
              text="Select your professional archetype so we can curate the right workflow and Kanban flows for your daily narrative."
              baseDelay={0.6}
            />
          </p>

          {/* Trust Section */}
          <div className="flex items-center gap-3 animate-[fadeIn_0.8s_1.2s_both]">
            <div className="flex -space-x-2">
              <img
                className="w-8 h-8 rounded-full border-2 border-[#f8f9ff] dark:border-[#0d0d1a] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3SzNzGReXHQz56v-ziaRnrAr05sTDrvnFnsliZau3bv3JTm68A_a9AO8ldbtHO4gPCR3x3NCuJPkGEcZxCsSi5wn4cCkh2aOi7D0oVLXuWbvRY6iHsxfTWquOrGLMiSDb8AqtHAro6glb_TB3QBcW0sgjODs832os19_sMNzInWzWWmbtgMvX1BAhOWlLw2oBuqrM-syKmakBugan3Ckay2onO96MPmr8QlwDiZ4lAyAq3xrnocDlrEVJfo2ZcaTbAQWDWIHohX7c"
                alt="User"
              />
              <img
                className="w-8 h-8 rounded-full border-2 border-[#f8f9ff] dark:border-[#0d0d1a] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT6FKzBAlso1R8dg2KGP3k6nnKGgyWsQ2yH9l2yS-RjvCvEEtIs0VzYCPvliIjAjTFJf9GD0Kr4ADKD3GarMEhcLRwOkq6Krsap7tktB-FwaIA98UYc1EtzVfHrvzGu2oLUsfrFa5RIDygZPfda11QgriD5vq9IBYxoKehxlckYjWclVLk3anACFO0xmxslBzIwiw_glStcOBTbftA2BQbLw6KnL-A3wkaZUooui7gGzQsFmuQxQPAHoUif_Cc8Y4pmrhejpwTy7OZ"
                alt="User"
              />
              <div className="w-8 h-8 rounded-full border-2 border-[#f8f9ff] dark:border-[#0d0d1a] bg-[#dbe9ff] dark:bg-violet-700 flex items-center justify-center text-[#0d1c2d] dark:text-white text-[10px] font-bold">
                +12k
              </div>
            </div>
            <span className="text-[#494454] dark:text-white/50 text-sm font-medium">Trusted by global editors</span>
          </div>
        </div>

        {/* Right: Glass Panel */}
        <div className="w-full max-w-md lg:max-w-lg bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-[#cbc3d7]/20 dark:border-white/10 rounded-[24px] p-10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.06)] dark:shadow-2xl flex flex-col gap-6 animate-[fadeIn_0.8s_0.3s_both]">
          {/* Field Grid */}
          <div className="grid grid-cols-3 gap-3">
            {FIELDS.map((field) => (
              <FieldCard
                key={field.id}
                title={field.title}
                icon={field.icon}
                isSelected={selectedField === field.id}
                onClick={() => handleFieldClick(field.id)}
              />
            ))}
          </div>

          {/* Footer: step + button */}
          <div className="flex items-center justify-between gap-4 pt-2">
            {/* Step indicator */}
            <div className="flex flex-row items-center sm:flex-col sm:items-start gap-3 sm:gap-1.5 flex-1 min-w-0">
              <div className="flex-1 sm:w-full h-1 bg-[#dbe9ff] dark:bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6b38d4] dark:bg-gradient-to-r dark:from-violet-500 dark:to-indigo-500 rounded-full transition-all duration-700 ease-in-out"
                  style={{ width: fillWidth }}
                />
              </div>
              <span className="text-[#494454] dark:text-white/40 text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                <span className="hidden sm:inline">Step </span>{displayStep}
                <span className="sm:hidden">/</span><span className="hidden sm:inline"> of </span>3
              </span>
            </div>

            <Button
              disabled={!selectedField || isCompleting}
              onClick={handleComplete}
            >
              {isCompleting ? "Entering Board..." : "Set up my board"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
