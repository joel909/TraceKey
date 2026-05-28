import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { AuthorizationError } from "@/lib/errors/extended_errors/AuthorizationError";
import CustomerDashboard, { metadata } from "./customerDashboard";
import InvalidDashboardPage from "./invalidPage";
import { DashboardController } from "@/lib/controllers/dashboard.controller";
import { getTodayDashboardDateRange } from "@/lib/database/dashboard/utils";
import { DashboardStatsInterface } from "@/lib/interfaces/customerDashboardStatsInterface";
export { metadata };

export default async function CustomerDashboardPage() {
  const { startingDate, endingDate } = getTodayDashboardDateRange();
  const dashboardController = new DashboardController();

  try {
    const auth_key = (await cookies()).get("auth_key")?.value;
    if (!auth_key) {
      throw new AuthenticationError("Authentication key is required");
    }
    const dashboardStats: DashboardStatsInterface | null =
      await dashboardController.getCustomerFrontendDashboardData(
        auth_key,
        startingDate,
        endingDate
      );

    return <CustomerDashboard dashboardStats={dashboardStats} />;
  } catch (error) {
    if (error instanceof AuthenticationError) {
      redirect("/logout");
    }
    if (error instanceof AuthorizationError) {
      return <InvalidDashboardPage caseType="authorization" />;
    }
    console.error("Error loading dashboard data:", error);
    return <InvalidDashboardPage caseType="load_failed" />;
  }
}
