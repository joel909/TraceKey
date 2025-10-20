import createUserProject from "../database/user/projects/createProject";
import fetchProjects from "../database/user/projects/fetchProjects";
import fetchSingleProjectDataByID from "../database/user/projects/fetchSingleProjectDetails";
import { AuthenticationError } from "../errors/extended_errors/AuthenticationError";
import {CreateUserProjectResponse, Project, SingleProjectDetails} from "../interfaces/project_interface";
import { authController } from "./auth.controller";

export class ProjectController {
    async createProject(uuid: string,project_name:string,api_key:string,password:string,description:string,site_url:string) : Promise<CreateUserProjectResponse> {
        const requestCreation = await createUserProject(uuid, project_name, api_key, password, description, site_url);
        return requestCreation;


    }

    async fetchSingleProjectDetailsByID(id: string,auth_key:string) : Promise<SingleProjectDetails> {
        // code to fetch project details by ID
        const userData = await authController.verifyAuthKey(auth_key);
        const uuid = userData.uuid;
        await authController.verifyUserProjectAccess( uuid, id);
        const projectDetails = await fetchSingleProjectDataByID(id);
        // console.log("Project Details:", projectDetails);
        return projectDetails;
        
        
  
  }

    async fetchUserProjects(auth_key: string) : Promise<Project[]> {
        if (!auth_key) {
          throw new AuthenticationError('Authentication key is required');
        }
        const userData = await authController.verifyAuthKey(auth_key);
        const uuid = userData.uuid;
        const fetchUserProjects = await fetchProjects(uuid);
        return fetchUserProjects;

      }
  //before adding remember to add a return type

}

export const projectController = new ProjectController();

// export  async function fetchUserAssociatedProjectsService(uuid: string) {
//     const userHandler = new UserHandler();
//     return await userHandler.fetchUserAssociatedProjects(uuid);
// }




