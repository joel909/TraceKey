import { query } from "@/lib/database/config/db";
import { fetchSingleProjectNIpLogsQuery } from "@/lib/database/config/queries";
import { LogActivity } from "@/lib/interfaces/deviceInfoInterface";

export default async function getProjectLogs(projectId: string,page = 1): Promise<LogActivity[]> {
    const offSet = (page - 1) * 10;
    const fetchedLogs = await query("FETCH_PROJECT_LOGS", fetchSingleProjectNIpLogsQuery, [projectId, 10, offSet]);

    console.log("Fetched project logs for projectId:", projectId, "data received is:", fetchedLogs);
    const projectIntialLogs: LogActivity[] = [];
    // Map the database results to LogActivity objects
    for(const log of fetchedLogs){
        const logEntry: LogActivity = {
            ip: log.ip_address || "Unknown",
            time: log.timestamp ? new Date(log.timestamp).toLocaleString() : "Unknown",
            device: log.device || "Unknown",
            region: log.region || "Unknown",
            interactionID: log.interaction_id || "Unknown",
            userAgent: log.user_agent || "Unknown",
            referrerUrl: log.referrer_url || "Direct Visit",
            cookies: log.cookies || "No cookies",
            additionalDeviceInfo: log.additional_device_info ? JSON.stringify(log.additional_device_info) : "No data"
        }
        projectIntialLogs.push(logEntry);
    }

    
    return projectIntialLogs;
}