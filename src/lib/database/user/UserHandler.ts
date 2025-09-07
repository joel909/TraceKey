import  createUser  from "./createUser/createUser";
export default class UserHandler {
    async createUser(email: string, name: string, hashedPassword: string, authKey: string) {
        return await createUser(email, name, hashedPassword, authKey);
    }
}