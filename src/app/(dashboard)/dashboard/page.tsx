import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard workspace.",
};

export default function DashboardPage() {
  return (
    <main className="flex-1 p-6">
      <section className="rounded-3xl border border-dashed border-[#647FBC]/30 bg-white/60 p-10 shadow-sm backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#647FBC]/70">
          Dashboard reset
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#647FBC]">
          Fresh start
        </h2>
        <p className="mt-3 max-w-2xl text-base text-slate-600">
          The previous dashboard widgets and data view have been cleared.
          This space is now a blank shell for whatever should come next.
        </p>
        <div className="mt-8 rounded-2xl border border-[#647FBC]/15 bg-[#FAFDD6]/70 p-6 text-sm text-slate-600">
          No metrics, tables, or charts are mounted here yet.
        </div>
      </section>
    </main>
  );
}
