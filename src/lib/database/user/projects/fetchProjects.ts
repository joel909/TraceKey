import { query } from "../../config/db";
import { fetchUserAssociatedProjects } from "../../config/queries";
import  {Project}  from "../../../interfaces/project_interface";

export default async function fetchProjects(uuid: string) : Promise<Project[]> {
    const userProjects = await query("FETCH USER ASSOCIATED PROJECTS",fetchUserAssociatedProjects, [uuid]);
    //console.log("Fetched User Projects:", userProjects);
    const project_set : Project[] = [];
    for (const project_item of userProjects) {
        const project: Project = {
            id: project_item.project_id,
            name: project_item.project_name || "Unnamed Project",
            description: project_item.description || "No description provided   ",
            site_link: project_item.site_url || "No link provided",
            visits: project_item.visits || "NaN",
            users: project_item.users || "NaN"
        }
        project_set.push(project);
    }
    return project_set;
}