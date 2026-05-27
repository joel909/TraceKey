import type { Metadata } from "next";
import DashboardDateSelector from "@/components/cards/DashboardDateSelector";
import StatsBox from "@/components/cards/StatsBox";

export const metadata: Metadata = {
  title: "Customer Frontend Dashboard",
  description: "Customer-facing dashboard for TraceKey.",
};

type StatItem = { label: string; value: number | string };

const stats: StatItem[] = [
  { label: "Total users", value: 0 },
  { label: "Total signups", value: 0 },
  { label: "Total people who joined rides", value: 0 },
  { label: "Ride show-up rate", value: "0%" },
  { label: "Present while boarding", value: 0 },
  { label: "Signup conversion rate", value: "0%" },
];

export default function CustomerDashboardPage() {
  return (
    <main className="flex-1 p-6">
      <section className="relative z-10 mb-6 rounded-3xl border border-dashed border-[#647FBC]/30 bg-white/60 p-10 shadow-sm backdrop-blur-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#647FBC]/70">
          Customer frontend dashboard
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#647FBC]">
          Customer dashboard metrics
        </h2>
        <div className="mt-6">
          <DashboardDateSelector />
        </div>
      </section>
      <div className="relative z-0 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value }) => (
          <StatsBox key={label} label={label} value={value} />
        ))}
      </div>
    </main>
  );
}
