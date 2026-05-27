"use client";

import { useState } from "react";

type Mode = "day" | "range";

export default function DashboardDateSelector() {
  const todayValue = new Date().toISOString().slice(0, 10);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("day");
  const [day, setDay] = useState(todayValue);
  const [start, setStart] = useState(day);
  const [end, setEnd] = useState(day);

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

  return (
    <div className="relative z-[60] max-w-md">
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
                  onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-xl border border-[#647FBC]/20 px-4 py-3 text-sm text-[#647FBC] outline-none [color-scheme:light] focus:border-[#647FBC]"
                />
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="w-full rounded-xl border border-[#647FBC]/20 px-4 py-3 text-sm text-[#647FBC] outline-none [color-scheme:light] focus:border-[#647FBC]"
                />
                <input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="w-full rounded-xl border border-[#647FBC]/20 px-4 py-3 text-sm text-[#647FBC] outline-none [color-scheme:light] focus:border-[#647FBC]"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const active =
  "rounded-lg bg-[#647FBC] px-3 py-2 text-sm font-medium text-white";
const inactive =
  "rounded-lg bg-[#647FBC]/10 px-3 py-2 text-sm font-medium text-[#647FBC]";
