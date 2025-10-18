import { createUserQuery } from "../../config/queries";
import { query } from "../../config/db";
import { ValidationError } from '../../../errors/extended_errors/ValidationError';
import { cleanInputForServer } from "@/lib/utils/cleanInputs";
import validateAuthInput from "@/lib/utils/validateAuthInput";
import { AccountCreationResponse } from "@/lib/interfaces/UserInterfaces";


export default async function createUser(email: string, username: string, password: string, authKey: string) : Promise<AccountCreationResponse>{
    try {
        if (!username || !email || !password) {
            throw new ValidationError("Username, email, and password are required", "missing_fields");
          }
        
          // clean inputs
          username = cleanInputForServer(username);
          email = cleanInputForServer(email);
          password = cleanInputForServer(password);
        
          // validate
          const [isValid, fields, reason] = validateAuthInput(email, password, username);
          if (!isValid) {
            throw new ValidationError(reason, fields);
          }

        const creationRequest = await query("CREATE_USER", createUserQuery, [email, username, password, authKey]);

        // Assuming creationRequest[0] contains the user data
        const user = creationRequest[0];
        const response: AccountCreationResponse = {
            uuid: user.uuid,
            email: user.email,
            name: user.name,
            auth_key: user.auth_key
        };
        return response;
    }catch (error) {
        //function to handle the error 
        throw error;
        
    }

}