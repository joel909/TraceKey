import fetchStats from "./customer-frontend/fetchStats";
import { parseDateOnly, toKolkataDayBounds } from "./utils";
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";
import type { DashboardStatsInterface } from "@/lib/interfaces/customerDashboardStatsInterface";

export default class DashboardService {
    async getCustomerFrontendDashboardData(
        projectId: string,
        startingDate: string,
        endingDate: string
    ): Promise<DashboardStatsInterface | null> {
        const start = parseDateOnly(startingDate, "startingDate");
        const end = parseDateOnly(endingDate, "endingDate");

        if (start.getTime() > end.getTime()) {
            throw new ValidationError(
                "The startingDate cannot be after the endingDate.",
                "startingDate"
            );
        }

        const startBounds = toKolkataDayBounds(startingDate);
        const endBounds = toKolkataDayBounds(endingDate);

        return await fetchStats(projectId, startBounds.start, endBounds.end);
    }
}
