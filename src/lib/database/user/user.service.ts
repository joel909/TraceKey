import { Project } from "@/lib/interfaces/project_interface";
import fetchProjects  from "./projects/fetching-data/fetchProjects";
import attachProjectToUser from "./user/attachProjectToUser";
import checkUserExistsByEmail from "./user/checkUserExistsByEmail";
import  createUser  from "./user/createUser";
import fetchUserByEmailQuery from "./user/fetchUserInfoFromEmail";
import fetchUsersAttachedWithProject from "./user/fetchUsersAttachedWithProject";
import verifyUserProjectOwnerShip from "./user/verifyUserProjectOwnerShip";
export default class UserService {
    async createUser(email: string, name: string, hashedPassword: string, authKey: string) {
        return await createUser(email, name, hashedPassword, authKey);
    }
    // async createDefaultProject(uuid: string) {
    //     return await createUserProject(uuid,"Default Project","default_api_key","default_password","This is your default project","http://example.com");
    // }
    async fetchUserAssociatedProjects(uuid: string): Promise<Project[]> {
        return await fetchProjects(uuid);

    }
    async addUserToProject(userUUID:string,newUserEmail:string,projectID:string): Promise<void> {
        await verifyUserProjectOwnerShip(userUUID,projectID);
        await checkUserExistsByEmail(newUserEmail);
        const newUserUUID = await fetchUserByEmailQuery(newUserEmail);
        await attachProjectToUser(newUserUUID,projectID);

    }
    async removeUserFromProject(userUUID:string,removeUserEmail:string,projectID:string): Promise<void> {}
    async getUsersAttachedToProject(projectId:string,uuid:string): Promise<string[]> {
        //fetch users attached to project from user_projects table by joining with users table to get email addresses
        const emails = await fetchUsersAttachedWithProject(projectId, uuid);                  
        return emails;
    }
    

}