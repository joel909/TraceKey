import { query } from "@/lib/database/config/db";
import {projectLogStatics} from "@/lib/database/config/queries";
import { LogActivityStaticsInterface } from "@/lib/interfaces/deviceInfoInterface";

export default async function getLogStatics(projectId: string): Promise<LogActivityStaticsInterface> {
    const fetchedStatics = await query("FETCH_PROJECT_LOG_STATICS", projectLogStatics, [projectId]);
    const logStatics: LogActivityStaticsInterface = {
        uniqueVisitors: String(fetchedStatics[0]?.unique_visitors) || "Failed to fetch",
        totalVisits: String(fetchedStatics[0]?.total_visits) || "Failed to fetch"
    }
    return logStatics;
}