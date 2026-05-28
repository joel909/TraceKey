import type { Metadata } from "next";
import DashboardDateSelector from "@/components/cards/DashboardDateSelector";
import StatsBox from "@/components/cards/StatsBox";
import type { DashboardStatsInterface } from "@/lib/interfaces/customerDashboardStatsInterface";

export const metadata: Metadata = {
  title: "Customer Frontend Dashboard",
  description: "Customer-facing dashboard for TraceKey.",
};

type StatItem = { label: string; value: number | string };

function toNumber(value: string | null): number {
  if (value === null) {
    return 0;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatPercent(numerator: number, denominator: number): string {
  if (denominator <= 0) {
    return "0%";
  }

  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}

export default function CustomerDashboard({
  dashboardStats,
}: {
  dashboardStats: DashboardStatsInterface | null;
}) {
  const totalUsers = toNumber(dashboardStats?.unique_visitors ?? null);
  const totalSignups = toNumber(dashboardStats?.total_signups ?? null);
  const totalMembersJoined = toNumber(dashboardStats?.total_members_joined ?? null);
  const totalMembersBoarded = toNumber(dashboardStats?.total_members_boarded ?? null);

  const stats: StatItem[] = [
    { label: "Total users", value: totalUsers },
    { label: "Total signups", value: totalSignups },
    { label: "Total people who joined rides", value: totalMembersJoined },
    { label: "Ride show-up rate", value: formatPercent(totalMembersBoarded, totalMembersJoined) },
    { label: "Present while boarding", value: totalMembersBoarded },
    { label: "Signup conversion rate", value: formatPercent(totalSignups, totalUsers) },
  ];

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
        <p className="mt-4 text-sm text-[#647FBC]/70">
          Data not available for dates before May 28, 2026.
        </p>
      </section>
      <div className="relative z-0 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value }) => (
          <StatsBox key={label} label={label} value={value} />
        ))}
      </div>
    </main>
  );
}
