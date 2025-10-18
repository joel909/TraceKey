import { CreateUserProjectResponse } from "@/lib/interfaces/project_interface";
import { query } from "../../config/db";
import { createProject } from "../../config/queries";
import {AddUserToProjectQuery} from "../../config/queries";
export default async function createUserProject(uuid: string,project_name:string,api_key:string,password:string,description:string,site_url:string) : Promise<CreateUserProjectResponse> {
        const request = await query("CREATE_PROJECT",createProject, [uuid, project_name, api_key, password, description, site_url]);
        const project_id = request[0].project_id;
        //console.log("Project created with ID:", project_id);
        const request2 = await query("ADD_USER_TO_PROJECT",AddUserToProjectQuery, [project_id, uuid]);

        const response: CreateUserProjectResponse = {
            project_id: request[0].project_id,
            created_by: request[0].created_by,
            project_name: request[0].project_name,
            api_key: request[0].api_key,
            created_at: request[0].created_at,
            description: request[0].description,
            site_url: request[0].site_url,
            uuid: request2[0].uuid,
            timestamp: request2[0].timestamp
            };
        return response;
    // Implementation for creating a default project for the user
}
