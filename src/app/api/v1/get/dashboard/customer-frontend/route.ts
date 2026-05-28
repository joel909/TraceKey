import { cookies } from "next/headers";
import { DashboardController } from "@/lib/controllers/dashboard.controller";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { AuthorizationError } from "@/lib/errors/extended_errors/AuthorizationError";
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const auth_key = cookieStore.get("auth_key")?.value;
    const url = new URL(request.url);
    const startingDate = url.searchParams.get("startingDate");
    const endingDate = url.searchParams.get("endingDate");
    const dashboardController = new DashboardController();

    try {
        if (!auth_key) {
            throw new AuthenticationError("Authentication key is required");
        }

        if (!startingDate) {
            throw new ValidationError("The startingDate is required.", "startingDate");
        }

        if (!endingDate) {
            throw new ValidationError("The endingDate is required.", "endingDate");
        }

        const dashboardStats = await dashboardController.getCustomerFrontendDashboardData(
            auth_key,
            startingDate,
            endingDate
        );

        return new Response(JSON.stringify({ dashboardStats }), { status: 200 });
    } catch (error) {
        if (error instanceof AuthenticationError) {
            return new Response(JSON.stringify({ message: error.message }), { status: 401 });
        }

        if (error instanceof AuthorizationError) {
            return new Response(JSON.stringify({ message: error.message }), { status: 403 });
        }

        if (error instanceof ValidationError) {
            return new Response(
                JSON.stringify({ message: error.message, field: error.field }),
                { status: 400 }
            );
        }

        console.error("Error fetching customer frontend dashboard data:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
