"use client";

import { useEffect, useState } from "react";
import { getTodayISODate, shiftISODate } from "@/lib/database/dashboard/utils";

type Mode = "day" | "range";
type QuickPreset = {
  label: string;
  start: string;
  end: string;
};

const MIN_DATE = "2026-05-28";

export default function DashboardDateSelector({
  startingDate,
  endingDate,
  onChange,
}: {
  startingDate: string;
  endingDate: string;
  onChange: (value: { startingDate: string; endingDate: string }) => void;
}) {
  const todayValue = getTodayISODate();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(
    startingDate === endingDate ? "day" : "range"
  );
  const [day, setDay] = useState(endingDate);
  const [start, setStart] = useState(startingDate);
  const [end, setEnd] = useState(endingDate);

  useEffect(() => {
    setMode(startingDate === endingDate ? "day" : "range");
    setDay(endingDate);
    setStart(startingDate);
    setEnd(endingDate);
  }, [startingDate, endingDate]);

  const isBeforeMinDate = (value: string) => value < MIN_DATE;
  const selectedBeforeMin =
    mode === "day" ? isBeforeMinDate(day) : isBeforeMinDate(start) || isBeforeMinDate(end);

  const format = (value: string) =>
    new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const label =
    mode === "day"
      ? `${day === todayValue ? "Today" : "Selected"}, ${format(day)}`
      : `${format(start)} - ${format(end)}`;

  const presets: QuickPreset[] = [
    { label: "Today", start: todayValue, end: todayValue },
    { label: "Last 24 H", start: shiftISODate(todayValue, -1), end: todayValue },
    {
      label: "Yesterday",
      start: shiftISODate(todayValue, -1),
      end: shiftISODate(todayValue, -1),
    },
    { label: "Last 7 days", start: shiftISODate(todayValue, -6), end: todayValue },
    { label: "Last 30 days", start: shiftISODate(todayValue, -29), end: todayValue },
  ];

  const updateSingleDay = (value: string) => {
    setDay(value);
    setStart(value);
    setEnd(value);
    onChange({ startingDate: value, endingDate: value });
  };

  const updateRangeStart = (value: string) => {
    setStart(value);
    onChange({ startingDate: value, endingDate: end });
  };

  const updateRangeEnd = (value: string) => {
    setEnd(value);
    onChange({ startingDate: start, endingDate: value });
  };

  return (
    <div className="relative z-[60] w-full">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between rounded-2xl border border-[#647FBC]/20 bg-white px-4 py-4 text-left shadow-sm transition hover:border-[#647FBC]/40 hover:bg-white/90"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#647FBC]/60">
            Date filter
          </p>
          <p className="mt-1 text-sm font-medium text-[#647FBC]">{label}</p>
        </div>
        <span className="text-sm text-[#647FBC]">▾</span>
      </button>
      {open && (
        <div className="absolute z-[70] mt-2 w-full rounded-2xl border border-[#647FBC]/20 bg-white p-4 shadow-lg">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("day")}
              className={mode === "day" ? active : inactive}
            >
              One day
            </button>
            <button
              type="button"
              onClick={() => setMode("range")}
              className={mode === "range" ? active : inactive}
            >
              Date range
            </button>
          </div>
          <div className="mt-4">
            {mode === "day" ? (
                <input
                  type="date"
                  value={day}
                  onChange={(e) => updateSingleDay(e.target.value)}
                  min={MIN_DATE}
                  className="w-full rounded-xl border border-[#647FBC]/20 px-4 py-3 text-sm text-[#647FBC] outline-none [color-scheme:light] focus:border-[#647FBC]"
                />
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="date"
                  value={start}
                  onChange={(e) => updateRangeStart(e.target.value)}
                  min={MIN_DATE}
                  className="w-full rounded-xl border border-[#647FBC]/20 px-4 py-3 text-sm text-[#647FBC] outline-none [color-scheme:light] focus:border-[#647FBC]"
                />
                <input
                  type="date"
                  value={end}
                  onChange={(e) => updateRangeEnd(e.target.value)}
                  min={MIN_DATE}
                  className="w-full rounded-xl border border-[#647FBC]/20 px-4 py-3 text-sm text-[#647FBC] outline-none [color-scheme:light] focus:border-[#647FBC]"
                />
              </div>
            )}
          </div>
          <p className="mt-3 text-xs text-[#647FBC]/65">
            Data is available from May 28, 2026 onward.
          </p>
          {selectedBeforeMin && (
            <p className="mt-2 text-xs font-medium text-amber-700">
              Data not available for this date.
            </p>
          )}
        </div>
      )}
      <div className="mt-3 rounded-2xl border border-[#647FBC]/20 bg-white/70 p-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#647FBC]/60">
          Quick ranges
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {presets.map((preset) => {
            const activePreset =
              mode === "day"
                ? preset.start === day && preset.end === day
                : preset.start === start && preset.end === end;

            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => {
                  setMode(preset.start === preset.end ? "day" : "range");
                  setDay(preset.end);
                  setStart(preset.start);
                  setEnd(preset.end);
                  onChange({ startingDate: preset.start, endingDate: preset.end });
                }}
                className={[
                  "min-w-[120px] flex-1 rounded-full border px-3 py-2 text-xs font-medium whitespace-nowrap transition",
                  activePreset
                    ? "border-[#647FBC] bg-[#647FBC] text-white"
                    : "border-[#647FBC]/20 bg-[#647FBC]/5 text-[#647FBC] hover:bg-[#647FBC]/10",
                ].join(" ")}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-[#647FBC]/60">
          Data before May 28, 2026 may not be available.
        </p>
      </div>
    </div>
  );
}

const active =
  "rounded-lg bg-[#647FBC] px-3 py-2 text-sm font-medium text-white";
const inactive =
  "rounded-lg bg-[#647FBC]/10 px-3 py-2 text-sm font-medium text-[#647FBC]";
