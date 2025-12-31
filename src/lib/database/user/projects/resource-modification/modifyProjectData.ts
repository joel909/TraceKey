import { query } from "@/lib/database/config/db";
import { modifyProjectDataQuery } from "@/lib/database/config/queries";

export default async function modifyProjectData(projectId: string, name: string, description:string,deployed_url: string): Promise<void> {
    await query("UPDATE_PROJECT_DETAILS",modifyProjectDataQuery, [name, deployed_url, description, projectId])

}