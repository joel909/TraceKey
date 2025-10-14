import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { query } from "../../config/db";
import { fetchUserByEmailQuery } from "../../config/queries";
import { DatabaseConnectionError } from "@/lib/errors/extended_errors/DatabaseConnectionError";
export default async function fetchUserInfo(api_key: string) {
    try{
        const user = await query("FETCH USER",fetchUserByEmailQuery, [api_key]);
        // console.log("Fetched User:", user);
        if (user.length === 0) {
            throw new AuthenticationError('Invalid authentication key.');
        }
        return user;
    }
    catch(e){
        if (e instanceof AuthenticationError) {
            console.log("Authentication Error:", e.message);
            throw e;
        } else if (e instanceof DatabaseConnectionError) {
            console.log("Database Connection Error:", e.message);
        }
         else {
            console.log("Error:", e);
        }
        throw e;
    }

    }
    
