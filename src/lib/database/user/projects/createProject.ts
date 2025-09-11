import { query } from "../../config/db";
import { createProject } from "../../config/queries";
import {AddUserToProjectQuery} from "../../config/queries";
export default async function createUserProject(uuid: string,project_name:string,api_key:string,password:string,description:string,site_url:string) {
    try{
        const request = await query("CREATE_PROJECT",createProject, [uuid, project_name, api_key, password, description, site_url]);
        const project_id = request[0].project_id;
        //console.log("Project created with ID:", project_id);
        const request2 = await query("ADD_USER_TO_PROJECT",AddUserToProjectQuery, [project_id, uuid]);
        return { ...request[0], ...request2[0] };
    }catch(error){
        throw error
    }
    // Implementation for creating a default project for the user
}
