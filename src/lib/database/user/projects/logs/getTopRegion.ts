import { query } from "@/lib/database/config/db";
import { fetchTopRegion } from "@/lib/database/config/queries";

export default async function getTopRegion(projectId: string): Promise<string> {
    const fetchedRegionData = await query("FETCH_TOP_REGION", fetchTopRegion, [projectId]);
    return fetchedRegionData[0]?.region || "Unknown";
}