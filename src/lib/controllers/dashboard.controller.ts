//controller to populate dashboard data and handle all dashboard related operations
import { authController } from "./auth.controller";
import DashboardService from "../database/dashboard/dashboard.service";
import type { DashboardStatsInterface } from "@/lib/interfaces/customerDashboardStatsInterface";

//this is for all the dashbaord both customer and admin and all other required dashboards
export class DashboardController {
    private DashboardService: DashboardService;
    private customerFrontendDashboardUUID: string;
    constructor() {
        this.DashboardService = new DashboardService();
        //Define the customer frontend dashboard UUID
        this.customerFrontendDashboardUUID = "f7ccb8da-500e-4d08-9365-7743ff3e373c"; // this is a placeholder, replace with actual UUID or method to fetch it
    }
    async getCustomerFrontendDashboardData(
        auth_key: string,
        startingDate: string,
        endingDate: string
    ): Promise<DashboardStatsInterface | null> {
        const userData = await authController.verifyAuthKey(auth_key);
        await authController.verifyUserProjectAccess( userData.uuid, this.customerFrontendDashboardUUID);
        return await this.DashboardService.getCustomerFrontendDashboardData(
            this.customerFrontendDashboardUUID,
            startingDate,
            endingDate
        );
    }
}
