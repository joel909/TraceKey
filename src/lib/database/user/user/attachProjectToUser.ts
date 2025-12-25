import { query } from "../../config/db";
import { addUserToProjectQuery } from "../../config/queries";
import fetchUserByEmailQuery from "./fetchUserInfoFromEmail";
export default async function attachProjectToUser(uuid:string, projectId:string) : Promise<void> {
    // Implementation to attach a project to a user by 
    // updating the user-project association in the database.
    const request = await query("ATTACH_PROJECT_TO_USER",addUserToProjectQuery, [projectId, uuid]);
    
}