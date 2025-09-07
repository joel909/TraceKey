import { createUserQuery } from "../../config/queries";
import { query } from "../../config/db";
import { ValidationError } from '../../../errors/ValidationError';


export default async function createUser(email: string, name: string, hashedPassword: string, authKey: string) {
    try {
        const creationRequest = await query("CREATE USER", createUserQuery, [email, name, hashedPassword, authKey]);
        return creationRequest;
    }catch (error) {
         if (error instanceof ValidationError && error.field === 'email') {
            throw new ValidationError('Email already exists', 'email');
        }

        throw new Error(`ERROR : failed to call Query in createUser \n\t${error}`);
    }

}