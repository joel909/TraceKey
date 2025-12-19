import { stringify } from "querystring";
import { query } from "../../config/db";
import { fetchProjectOwnerQuery } from "../../config/queries";
export default async function verifyUserProjectOwnerShip(uuid: string, projectId: string): Promise<boolean> {
    try{
        const projectOwner = await  query("VERIFY_USER_PROJECT_OWNERSHIP",fetchProjectOwnerQuery,[projectId]);
        if(projectOwner[0].created_by === uuid){
            return true;
        }
        return false;
    }
    catch(error){
        console.error("Error verifying project ownership:", error);
        return false;
    }
}