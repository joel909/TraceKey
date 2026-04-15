import { AccountCreationResponse } from "@/lib/interfaces/UserInterfaces";
import { query } from "../../config/db";
import {verifyEmailPasswordQuery} from "../../config/queries";
export async function verifyEmailPassword(email:string,password:string):Promise<AccountCreationResponse> {
    const request = await query(verifyEmailPasswordQuery,"LOGIN",[email,password]);
    const data = 
    {
        uuid: request[0].uuid,
        auth_key: request[0].auth_key,
        name: request[0].name,
        email: request[0].email
    }
    return data;
}