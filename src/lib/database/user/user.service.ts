import fetchProjects  from "./projects/fetching-data/fetchProjects";
import attachProjectToUser from "./user/attachProjectToUser";
import checkUserExistsByEmail from "./user/checkUserExistsByEmail";
import  createUser  from "./user/createUser";
import fetchUserByEmailQuery from "./user/fetchUserInfoFromEmail";
import verifyUserProjectOwnerShip from "./user/verifyUserProjectOwnerShip";
export default class UserService {
    async createUser(email: string, name: string, hashedPassword: string, authKey: string) {
        return await createUser(email, name, hashedPassword, authKey);
    }
    // async createDefaultProject(uuid: string) {
    //     return await createUserProject(uuid,"Default Project","default_api_key","default_password","This is your default project","http://example.com");
    // }
    async fetchUserAssociatedProjects(uuid: string) {
        return await fetchProjects(uuid);

    }
    async addUserToProject(userUUID:string,newUserEmail:string,projectID:string) {
        await verifyUserProjectOwnerShip(userUUID,projectID);
        await checkUserExistsByEmail(newUserEmail);
        const newUserUUID = await fetchUserByEmailQuery(newUserEmail);
        await attachProjectToUser(newUserUUID,projectID);

    }

}