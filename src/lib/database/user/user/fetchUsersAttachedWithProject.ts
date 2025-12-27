import { query } from "../../config/db";
import { fetchUsersAttachedWithProjectQuery } from "../../config/queries";

export default async function fetchUsersAttachedWithProject(projectId: string,uuid: string): Promise<Array<string>> {
    // Implementation to fetch users attached to a specific project from the database.
    const request = await query("FETCH_USERS_ATTACHED_WITH_PROJECT",fetchUsersAttachedWithProjectQuery, [projectId, uuid]);
    const user_emails: Array<string> = request.map(rows => rows.emails);
    return user_emails;
    // const user_emails

//     return user_emails;
    
}