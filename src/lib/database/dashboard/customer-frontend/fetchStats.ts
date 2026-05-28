import { query } from "../../config/db";
import { fetchProjectCustomerStatsQuery } from "../../config/queries";
import type { DashboardStatsInterface } from "@/lib/interfaces/customerDashboardStatsInterface";

export default async function fetchStats(
    projectId: string,
    startDate: string,
    endDate: string
): Promise<DashboardStatsInterface | null> {
    const result = await query("FETCH_PROJECT_CUSTOMER_STATS", fetchProjectCustomerStatsQuery, [
        projectId,
        startDate,
        endDate,
    ]);

    return (result[0] as DashboardStatsInterface | undefined) ?? null;
}
