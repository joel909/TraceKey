// lib/services/accountService.ts
import UserHandler from "@/lib/database/user/UserHandler";
import gen_auth_key from "@/lib/utils/auth_key";
import { setCookie } from "@/lib/cookies/setCookie";
import { UserCreationRequestInterface, AccountCreationResponse } from "../interfaces/CreateUserInterfaces";
import createUser from "../database/user/user/createUser";
import createUserProject from "../database/user/projects/createProject";



const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  path: '/',
  maxAge: 60 * 60 * 24 * 30, // 30 days
  sameSite: 'lax' as 'lax' | 'strict' | 'none' | undefined,
};

export  class AuthController {
  async createUser(data: UserCreationRequestInterface) : Promise<AccountCreationResponse> {
    const authKey = gen_auth_key();
    const { email, username: name, password } = data;
    const requestUserCreation = await createUser(email, name, password, authKey);
    const projectApiKey = gen_auth_key();
    const requestProjectCreation =  await createUserProject(requestUserCreation.uuid,"Default Project",projectApiKey,"default_password","This is your default project","http://example.com");

    await setCookie('auth_key', authKey, COOKIE_OPTIONS);
    await setCookie('username', name, COOKIE_OPTIONS);
    await setCookie('email', email, COOKIE_OPTIONS);


  return requestUserCreation
    }

}

export const authController = new AuthController();


export  async function fetchUserAssociatedProjectsService(uuid: string) {
    const userHandler = new UserHandler();
    return await userHandler.fetchUserAssociatedProjects(uuid);
}
