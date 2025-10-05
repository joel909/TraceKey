import { createUserQuery } from "../../config/queries";
import { query } from "../../config/db";
import { ValidationError } from '../../../errors/ValidationError';
import createUserProject from "../projects/createProject";
import gen_auth_key from "@/lib/utils/auth_key";


export default async function createUser(email: string, name: string, hashedPassword: string, authKey: string) {
    try {
        const baseURL = process.env.PROJECT_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const creationRequest = await query("CREATE USER", createUserQuery, [email, name, hashedPassword, authKey]);
        const api_key = gen_auth_key();
        const defaultProjectCreationRequest = await createUserProject(creationRequest[0].uuid, "Sample Project", api_key, "default123", "This is your default project.", `https://tracekey.joeljoby.com/sample-project?project_api_key=${api_key}`);
        //console.log("User created with ID:", defaultProjectCreationRequest);
        return creationRequest;
    }catch (error) {
         if (error instanceof ValidationError && error.field === 'email') {
            throw new ValidationError('Email already exists', 'email');
        }

        throw new Error(`ERROR : failed to call Query in createUser \n\t${error}`);
    }

}