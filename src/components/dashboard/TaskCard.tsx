"use client";

import type { TaskCardData } from "@/types";

// Avatar URLs
const AVATAR_1 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA3SzNzGReXHQz56v-ziaRnrAr05sTDrvnFnsliZau3bv3JTm68A_a9AO8ldbtHO4gPCR3x3NCuJPkGEcZxCsSi5wn4cCkh2aOi7D0oVLXuWbvRY6iHsxfTWquOrGLMiSDb8AqtHAro6glb_TB3QBcW0sgjODs832os19_sMNzInWzWWmbtgMvX1BAhOWlLw2oBuqrM-syKmakBugan3Ckay2onO96MPmr8QlwDiZ4lAyAq3xrnocDlrEVJfo2ZcaTbAQWDWIHohX7c";
const AVATAR_2 =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCT6FKzBAlso1R8dg2KGP3k6nnKGgyWsQ2yH9l2yS-RjvCvEEtIs0VzYCPvliIjAjTFJf9GD0Kr4ADKD3GarMEhcLRwOkq6Krsap7tktB-FwaIA98UYc1EtzVfHrvzGu2oLUsfrFa5RIDygZPfda11QgriD5vq9IBYxoKehxlckYjWclVLk3anACFO0xmxslBzIwiw_glStcOBTbftA2BQbLw6KnL-A3wkaZUooui7gGzQsFmuQxQPAHoUif_Cc8Y4pmrhejpwTy7OZ";

// Tag colour map
const TAG_COLOURS: Record<string, string> = {
  CONTENT: "bg-[#F3E8FF] dark:bg-violet-500/20 text-[#6B38D4] dark:text-violet-300 border-transparent dark:border-violet-500/30",
  STRATEGY: "bg-[#E0F2FE] dark:bg-cyan-500/20 text-[#0369A1] dark:text-cyan-300 border-transparent dark:border-cyan-500/30",
  SOCIAL: "bg-[#DCFCE7] dark:bg-emerald-500/20 text-[#15803D] dark:text-emerald-300 border-transparent dark:border-emerald-500/30",
  EMAIL: "bg-[#FEF3C7] dark:bg-amber-500/20 text-[#B45309] dark:text-amber-300 border-transparent dark:border-amber-500/30",
};

function tagClass(tag: string) {
  return (
    TAG_COLOURS[tag] ?? "bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white/60 border-transparent dark:border-white/10"
  );
}

interface TaskCardProps {
  card: TaskCardData;
}

export default function TaskCard({ card }: TaskCardProps) {
  return (
    <div className="group bg-white dark:bg-white/5 hover:bg-[#FAFBFC] dark:hover:bg-white/8 border border-[#E2E8F0] dark:border-white/10 dark:hover:border-white/20 rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200 shadow-sm dark:shadow-none hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 hover:-translate-y-[2px] cursor-pointer">
      {/* Header: tag + optional badge */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${tagClass(card.tag)}`}
        >
          {card.tag}
        </span>

        {card.tag === "SOCIAL" && (
          <span
            className="material-symbols-outlined text-[#15803D] dark:text-emerald-400"
            style={{ fontVariationSettings: "'FILL' 1", fontSize: "18px" }}
          >
            check_circle
          </span>
        )}
        {card.tag === "EMAIL" && (
          <span className="text-[10px] font-bold text-[#B45309] dark:text-amber-300 border border-transparent dark:border-amber-500/30 bg-[#FEF3C7] dark:bg-amber-500/10 rounded-full px-2 py-0.5 tracking-wider">
            NOV 12
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-[#1A202C] dark:text-white font-bold text-[15px] leading-snug">
        {card.title}
      </h3>

      {/* Description */}
      {card.desc && (
        <p className="text-[#718096] dark:text-white/50 text-[13px] leading-relaxed line-clamp-2">
          {card.desc}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        {/* Avatars */}
        <div className="flex -space-x-1.5">
          <img
            src={AVATAR_1}
            alt="Avatar"
            className="w-6 h-6 rounded-full border-2 border-[#13131f] object-cover"
          />
          <img
            src={AVATAR_2}
            alt="Avatar"
            className="w-6 h-6 rounded-full border-2 border-[#13131f] object-cover"
          />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-[#A0AEC0] dark:text-white/40 text-xs font-semibold">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>
              chat_bubble
            </span>
            {card.comments}
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: "13px" }}>
              schedule
            </span>
            {card.time}
          </span>
        </div>
      </div>
    </div>
  );
}
