"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardDateSelector from "@/components/cards/DashboardDateSelector";
import StatsBox from "@/components/cards/StatsBox";
import type { DashboardStatsInterface } from "@/lib/interfaces/customerDashboardStatsInterface";
import { formatPercent, getTodayDashboardDateRange, toNumber } from "@/lib/database/dashboard/utils";
import InvalidDashboardPage from "./invalidPage";
import CustomerDashboardMobile from "./customerDashboardMobile";

type StatItem = { label: string; value: number | string };

export default function CustomerDashboard({
  dashboardStats,
  initialStartingDate,
  initialEndingDate,
}: {
  dashboardStats: DashboardStatsInterface | null;
  initialStartingDate: string;
  initialEndingDate: string;
}) {
  const router = useRouter();
  const todayRange = getTodayDashboardDateRange();
  const [statsData, setStatsData] = useState<DashboardStatsInterface | null>(dashboardStats);
  const [selectedRange, setSelectedRange] = useState({
    startingDate: initialStartingDate,
    endingDate: initialEndingDate,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorCase, setErrorCase] = useState<"authorization" | "load_failed" | null>(null);
  const hasInitializedFetch = useRef(false);

  useEffect(() => {
    setStatsData(dashboardStats);
    setSelectedRange({
      startingDate: initialStartingDate,
      endingDate: initialEndingDate,
    });
    setErrorCase(null);
  }, [dashboardStats, initialStartingDate, initialEndingDate]);

  useEffect(() => {
    if (!hasInitializedFetch.current) {
      hasInitializedFetch.current = true;
      return;
    }
    let cancelled = false;

    const loadDashboardStats = async () => {
      setIsLoading(true);
      setErrorCase(null);

      try {
        const response = await fetch(
          `/api/v1/get/dashboard/customer-frontend?startingDate=${encodeURIComponent(
            selectedRange.startingDate
          )}&endingDate=${encodeURIComponent(selectedRange.endingDate)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (response.status === 401) {
          router.push("/logout");
          return;
        }

        if (response.status === 403) {
          const payload = (await response.json()) as { message?: string };
          if (!cancelled) {
            window.alert(payload.message ?? "Authorization error.");
            setErrorCase("authorization");
          }
          return;
        }

        if (!response.ok) {
          const payload = (await response.json()) as { message?: string };
          throw new Error(payload.message ?? "Failed to fetch dashboard stats.");
        }

        const payload = (await response.json()) as { dashboardStats: DashboardStatsInterface | null };
        if (!cancelled) {
          setStatsData(payload.dashboardStats ?? null);
        }
      } catch (error) {
        console.error("Error refreshing dashboard stats:", error);
        if (!cancelled) {
          window.alert(
            error instanceof Error ? error.message : "Failed to fetch dashboard stats."
          );
          setErrorCase("load_failed");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadDashboardStats();

    return () => {
      cancelled = true;
    };
  }, [
    router,
    selectedRange.endingDate,
    selectedRange.startingDate,
  ]);

  if (errorCase) {
    return <InvalidDashboardPage caseType={errorCase} />;
  }

  const totalUsers = toNumber(statsData?.unique_visitors ?? null);
  const totalSignups = toNumber(statsData?.total_signups ?? null);
  const totalMembersJoined = toNumber(statsData?.total_members_joined ?? null);
  const totalMembersBoarded = toNumber(statsData?.total_members_boarded ?? null);

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
      <CustomerDashboardMobile
        stats={stats}
        isLoading={isLoading}
        selectedRange={selectedRange}
        onChange={setSelectedRange}
      />
      <section className="relative z-10 mb-6 hidden rounded-3xl border border-dashed border-[#647FBC]/30 bg-white/60 p-10 shadow-sm backdrop-blur-sm md:block">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#647FBC]/70">
          Customer frontend dashboard
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#647FBC]">
          Customer dashboard metrics
        </h2>
        <div className="mt-6">
          <DashboardDateSelector
            startingDate={selectedRange.startingDate}
            endingDate={selectedRange.endingDate}
            onChange={setSelectedRange}
          />
        </div>
        <p className="mt-4 text-sm text-[#647FBC]/70">
          Data not available for dates before May 28, 2026.
        </p>
        {isLoading && (
          <p className="mt-3 text-sm font-medium text-[#647FBC]">
            Updating dashboard data...
          </p>
        )}
        {selectedRange.startingDate !== todayRange.startingDate ||
        selectedRange.endingDate !== todayRange.endingDate ? (
          <p className="mt-2 text-sm text-[#647FBC]/70">
            Showing data from {selectedRange.startingDate} to {selectedRange.endingDate}.
          </p>
        ) : null}
      </section>
      <div className="relative z-0 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
        {stats.map(({ label, value }) => (
          <StatsBox key={label} label={label} value={value} loading={isLoading} />
        ))}
      </div>
    </main>
  );
}
