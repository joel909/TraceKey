import { stringify } from "querystring";
import { query } from "../../config/db";
import { fetchProjectOwnerQuery } from "../../config/queries";
export default async function verifyUserProjectOwnerShip(uuid: string, projectId: string): Promise<void> {
    const result = await query("VERIFY_USER_PROJECT_OWNERSHIP", fetchProjectOwnerQuery, [projectId, uuid]);
}