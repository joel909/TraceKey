import fetchProjects  from "./projects/fetchProjects";
import  createUser  from "./user/createUser";
export default class UserHandler {
    async createUser(email: string, name: string, hashedPassword: string, authKey: string) {
        return await createUser(email, name, hashedPassword, authKey);
    }
    // async createDefaultProject(uuid: string) {
    //     return await createUserProject(uuid,"Default Project","default_api_key","default_password","This is your default project","http://example.com");
    // }
    async fetchUserAssociatedProjects(uuid: string) {
        return await fetchProjects(uuid);

    }

}