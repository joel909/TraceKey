import { query } from "@/lib/database/config/db";
import { fetchSingleProjectNIpLogsQueryV2 } from "@/lib/database/config/queries";
import { LogActivity } from "@/lib/interfaces/deviceInfoInterface";

export default async function getProjectLogs(projectId: string,page = 1,duration: string): Promise<LogActivity[]> {
    const offSet = (page - 1) * 10;
    
    const fetchedLogs = await query("FETCH_PROJECT_LOGS", fetchSingleProjectNIpLogsQueryV2, [projectId, 10, offSet,duration]);

    // console.log("Fetched project logs for projectId:", projectId, "data received is:", fetchedLogs);
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
            additionalDeviceInfo: log.additional_device_info ? JSON.stringify(log.additional_device_info) : "No data",
            device_id : log.device_id || "Unknown Device ID",
            page_route : log.page_route || "Unknown Page",
            event_name : log.action_name || "Unknown Event"
        }
        projectIntialLogs.push(logEntry);
    }

    
    return projectIntialLogs;
}