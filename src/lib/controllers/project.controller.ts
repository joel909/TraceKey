import createUserProject from "../database/user/projects/createProject";
import createUserClientRecord from "../database/user/projects/createUserClientipRecord";
import fetchProjects from "../database/user/projects/fetchProjects";
import fetchSingleProjectDataByID from "../database/user/projects/fetchSingleProjectDetails";
import getProjectLogs from "../database/user/projects/logs/getIntialProjectLogs";
import { AuthenticationError } from "../errors/extended_errors/AuthenticationError";
import { DeviceInfo, LogActivity } from "../interfaces/deviceInfoInterface";
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
      return projectDetails;
    }

    //  async fetchProjectIDByAPIKey(api_key: string) : Promise<string> {

    //  }
    async fetchUserProjects(auth_key: string) : Promise<Project[]> {
        if (!auth_key) {
          throw new AuthenticationError('Authentication key is required');
        }
        const userData = await authController.verifyAuthKey(auth_key);
        const uuid = userData.uuid;
        const fetchUserProjects = await fetchProjects(uuid);
        return fetchUserProjects;
      }

    async createUserClientIpRecord(api_key: string, ip_address: string, user_agent: string, refferer_url: string, _device_information: any,_cookies : any,device:string,location:string,additionalDeviceInfo: DeviceInfo = {}): Promise<void> {
        await createUserClientRecord(api_key, ip_address, user_agent, refferer_url,_device_information,_cookies,device,location,additionalDeviceInfo);
    }

    //     ****CRITICAL****
    /*
    this is a bare function and does not verify auth keys nor does it check if the user is authorized to view to
    project logs, this is been done as this runs as an internal
    function after it makes sure the user is valid and has access so do not use this as a standalone function
    */
    async getIntialProjectIpLogs(id: string) : Promise<LogActivity[]> {
      const projectDetails = await getProjectLogs(id);
      // console.log("Project details fetched in controller:", projectDetails);
      return projectDetails;
    }



}

export const projectController = new ProjectController();


