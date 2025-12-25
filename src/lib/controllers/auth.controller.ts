// lib/services/accountService.ts
import gen_auth_key from "@/lib/utils/auth_key";
import { setCookie } from "@/lib/cookies/setCookie";
import { UserCreationRequestInterface, AccountCreationResponse, UserInfoInterface } from "../interfaces/UserInterfaces";
import createUser from "../database/user/user/createUser";
import fetchUserInfo from "../database/user/user/fetchUserInfo";
import { AuthenticationError } from "../errors/extended_errors/AuthenticationError";
import { projectController } from "./project.controller";
import verifyUserProjectAccess from "../database/user/projects/verification/verifyUserProjectAccess";
import verifyApiKey from "../database/user/projects/verification/verifyApiKey";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  path: '/',
  maxAge: 60 * 60 * 24 * 30, // 30 days
  sameSite: 'lax' as 'lax' | 'strict' | 'none' | undefined,
};

export class AuthController {
  async verifyAuthKey(authKey?: string): Promise<UserInfoInterface> {
    if (!authKey) {
      throw new AuthenticationError('Authentication key is required');
    }
    return await fetchUserInfo(authKey);
  }

  async createUser(data: UserCreationRequestInterface) : Promise<AccountCreationResponse> {
    const authKey = gen_auth_key();
    const { email, username: name, password } = data;
    const requestUserCreation = await createUser(email, name, password, authKey);
    const projectApiKey = gen_auth_key();
    await projectController.createProject(requestUserCreation.uuid,"Default Project",projectApiKey,"default_password","This is your default project",`https://tracekey.joeljoby.com/project/sample/${projectApiKey}`);
    await setCookie('auth_key', authKey, COOKIE_OPTIONS);
    await setCookie('username', name, COOKIE_OPTIONS);
    await setCookie('email', email, COOKIE_OPTIONS);
    return requestUserCreation;
  }

  async verifyUserProjectAccess(uuid: string, projectId: string){
    //this does not return anything yet, just verifies and if the user does not have access to the project then it throws an error so just deal with it then
    return await verifyUserProjectAccess(uuid, projectId);
  }
  async verifyApiKey(apiKey?: string): Promise<void> {
    if (!apiKey) {
      throw new AuthenticationError('API key is required');
    }
    await verifyApiKey(apiKey);
  }
  //the below function verifies if the particular user had created the project(by check created_by in projects table) making him the owner
  // async verifyUserProjectOwnerShip(uuid: string, projectId: string): Promise<boolean> {


  // }

  
}

export const authController = new AuthController();

