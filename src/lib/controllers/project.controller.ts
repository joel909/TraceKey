import createUserProject from "../database/user/projects/resource-creation/createProject";
import createUserClientRecord from "../database/user/projects/resource-creation/createUserClientipRecord";
import fetchProjects from "../database/user/projects/fetching-data/fetchProjects";
import fetchSingleProjectDataByID from "../database/user/projects/fetching-data/fetchSingleProjectDetails";
import getProjectLogs from "../database/user/projects/logs/getProjectLogs";
import getLogStatics from "../database/user/projects/logs/getLogStatics";
import getTopRegion from "../database/user/projects/logs/getTopRegion";
import { AuthenticationError } from "../errors/extended_errors/AuthenticationError";
import { DeviceInfo, LogActivity, LogActivityStaticsInterface } from "../interfaces/deviceInfoInterface";
import {CreateUserProjectResponse, Project, SingleProjectDetails} from "../interfaces/project_interface";
import { authController } from "./auth.controller";
import verifyUserProjectOwnerShip from "../database/user/user/verifyUserProjectOwnerShip";
import UserService from "../database/user/user.service";
import modifyProjectData from "../database/user/projects/resource-modification/modifyProjectData";
import fetchAllUsersProjectLogs from "../database/user/projects/logs/getAllProjectLogData";


export class ProjectController {
    private UserService: UserService;

    constructor() {
        this.UserService = new UserService();
    }
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
    async addUserToProject(projectId: string, newUserEmail: string,auth_key: string): Promise<void> {
      const userData = await authController.verifyAuthKey(auth_key);
      await this.UserService.addUserToProject(userData.uuid, newUserEmail, projectId);
    }
    async removeUserFromProject(projectId: string, removeUserEmail: string,auth_key: string): Promise<void> {
      const userData = await authController.verifyAuthKey(auth_key);
      await verifyUserProjectOwnerShip(userData.uuid, projectId);
      await this.UserService.removeUserFromProject( projectId,userData.uuid,removeUserEmail);
    }
    async getUsersAttachedToProject(projectId: string, auth_key: string): Promise<string[]> {
      const userData = await authController.verifyAuthKey(auth_key);
      const emails = await this.UserService.getUsersAttachedToProject(projectId,userData.uuid);
      return emails;
    }
    async modifyProjectData(projectId: string, name: string, description:string,deployed_url: string, auth_key: string): Promise<void> {
      await authController.verifyAuthKey(auth_key);
      await modifyProjectData( projectId, name, description,deployed_url);
    }

    async fetchAllUsersProjectLogs(auth_key:string,page=1) :Promise<[LogActivity[],LogActivityStaticsInterface,string]>{
      const userData = await authController.verifyAuthKey(auth_key);
      const uuid = userData.uuid;
      const [projectDetails,logStatics,top_region] = await fetchAllUsersProjectLogs(uuid,page);
      return [projectDetails,logStatics,top_region];
    }
    //this adds a user to a project by their email address
    


    //     ****CRITICAL****
    /*
    the below functions are bare function and does not verify auth keys nor does it check if the user is authorized to view to
    project logs, this is been done as this runs as an internal
    function after it makes sure the user is valid and has access so do not use this as a standalone function Make sure to verify user access before using this function
    */

    

    async getProjectIpLogs(id: string,page=1) : Promise<LogActivity[]> {
      const projectDetails = await getProjectLogs(id,page);
      // console.log("Project details fetched in controller:", projectDetails);
      return projectDetails;
    }

    async getProjectLogStatistics(id: string): Promise<LogActivityStaticsInterface> {
      const projectLogStatistics = await getLogStatics(id);
      return projectLogStatistics;
    }
    async getTopRegionOfProject(id: string): Promise<string> {
      const topRegion = await getTopRegion(id);
      return topRegion;
    }
}
export const projectController = new ProjectController();


