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
        throw new AuthorizationError('User does not have access to the specified project or it might not exist.');
    }
    else if(purpose === "VERIFY_API_KEY" && result.rows.length === 0){
        throw new AuthorizationError('Invalid API key.');
    }
    else if(purpose === "VERIFY_USER_PROJECT_OWNERSHIP" && result.rows.length === 0){
        throw new AuthorizationError('requesting User(You) is not the owner of the specified project');
    }
    else if(purpose === "CHECK_USER_EXISTS_BY_EMAIL" && result.rows.length === 0){
        throw new ResourceNotFoundError('No user found with the provided email address.');
    }
    else if(purpose === "FETCH_USER_BY_EMAIL" && result.rows.length == 0){
        throw new ResourceNotFoundError('No user found with the provided email address.');
    }
    else if(purpose === "FETCH_USERS_ATTACHED_WITH_PROJECT" && result.rows.length === 0){
        throw new ResourceNotFoundError('We could not find that project, or you do not have the permissions required to access it. Please check the URL or contact your admin');
    }
    else if(purpose === "REMOVE_PROJECT_FROM_USER" && result.rowCount === 0){
        throw new AuthorizationError('Failed to remove user from project. Please ensure you have the necessary permissions and that the user is part of the project and user is not trying to remove themselves.');
    }
}