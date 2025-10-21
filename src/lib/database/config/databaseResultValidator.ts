import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { AuthorizationError } from "@/lib/errors/extended_errors/AuthorizationError";
import { ResourceNotFoundError } from "@/lib/errors/extended_errors/ResourceNotFoundError";
import { QueryResult } from "pg";

export default function validateDatabaseResult(result: QueryResult, purpose: string) {
    //Check if requested projectg exists or not if not throws required error
    if (purpose === "FETCH_PROJECT_DETAILS_BY_ID" && result.rows.length === 0) {
        throw new ResourceNotFoundError('No project found with the given ID.');
    }
    else if(purpose === "FETCH_USER" && result.rows.length === 0){
        throw new AuthenticationError('Invalid authentication key.');
    }
    else if(purpose === "VERIFY_USER_PROJECT_ACCESS" && result.rows.length === 0){
        throw new AuthorizationError('User does not have access to the specified project.');
    }
    
}