"use client";

import StatsBox from "@/components/cards/StatsBox";
import { getTodayISODate, shiftISODate } from "@/lib/database/dashboard/utils";

type StatItem = { label: string; value: number | string };

export default function CustomerDashboardMobile({
  stats,
  isLoading,
  selectedRange,
  onChange,
}: {
  stats: StatItem[];
  isLoading: boolean;
  selectedRange: { startingDate: string; endingDate: string };
  onChange: (value: { startingDate: string; endingDate: string }) => void;
}) {
  const today = getTodayISODate();
  const presets = [
    { label: "Today", start: today, end: today },
    { label: "Last 24 H", start: shiftISODate(today, -1), end: today },
    {
      label: "Yesterday",
      start: shiftISODate(today, -1),
      end: shiftISODate(today, -1),
    },
    { label: "Last 7 days", start: shiftISODate(today, -6), end: today },
    { label: "Last 30 days", start: shiftISODate(today, -29), end: today },
  ];

  return (
    <section className="md:hidden">
      <div className="rounded-3xl border border-dashed border-[#647FBC]/30 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#647FBC]/70">
              Customer dashboard
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-[#647FBC]">
              Metrics
            </h2>
          </div>
          <div className="rounded-2xl bg-[#647FBC]/10 px-3 py-2 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#647FBC]/60">
              Selected range
            </p>
            <p className="mt-1 text-xs font-medium text-[#647FBC]">
              {selectedRange.startingDate} to {selectedRange.endingDate}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {presets.map((preset) => {
            const isActive =
              preset.start === selectedRange.startingDate &&
              preset.end === selectedRange.endingDate;

            return (
              <button
                key={preset.label}
                type="button"
                onClick={() =>
                  onChange({ startingDate: preset.start, endingDate: preset.end })
                }
                className={[
                  "rounded-2xl border px-3 py-3 text-left text-xs font-semibold transition",
                  preset.label === "Last 30 days" ? "col-span-2" : "",
                  isActive
                    ? "border-[#647FBC] bg-[#647FBC] text-white"
                    : "border-[#647FBC]/20 bg-white/80 text-[#647FBC]",
                ].join(" ")}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-[#647FBC]/70">
          Data not available for dates before May 28, 2026.
        </p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {stats.map(({ label, value }) => (
          <StatsBox key={label} label={label} value={value} loading={isLoading} />
        ))}
      </div>
    </section>
  );
}
