import { query } from "@/lib/database/config/db";
import { fetchAllProjectLogDataQueryV2 } from "@/lib/database/config/queries";
import { LogActivity, LogActivityStaticsInterface } from "@/lib/interfaces/deviceInfoInterface";

export default async function fetchAllUsersProjectLogs(uuid:string,page:number) : Promise<[LogActivity[],LogActivityStaticsInterface,string]> {
    const offSet = (page - 1) * 10;
    const logData = await query("FETCH_USERS_ALL_PROJECT_LOGS",fetchAllProjectLogDataQueryV2,[uuid,10,offSet]);
    console.log("Fetched Project Details:", logData);
    const logStatics :LogActivityStaticsInterface = {
        uniqueVisitors: String(logData[0]?.unique_visitors) || String(logData.length),
        totalVisits: String(logData[0]?.total_rows      ) || String(logData.length)
    }
    const topRegion = logData[0]?.top_region || "Unknown";
    const projectIntialLogs: LogActivity[] = [];
        // Map the database results to LogActivity objects
        for(const log of logData){
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
    return [projectIntialLogs,logStatics,topRegion];
}