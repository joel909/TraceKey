import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";
import { query } from "../../config/db";
import { removeUserFromProjectQuery } from "../../config/queries";

export default async function removeProjectFromUser(project_id :string,requester_uuid : string,remove_user_uuid: string) {
    if (requester_uuid === remove_user_uuid) {
        throw new ValidationError("You cannot remove yourself from the project." );
    }
    // Implementation to remove a project from a user's list of projects in the database.
    await query("REMOVE_PROJECT_FROM_USER",removeUserFromProjectQuery, [remove_user_uuid, project_id, requester_uuid]);

}