import { query } from "../../../config/db";
import { verifyUserProjectAccessQuery } from "../../../config/queries";

export default async function verifyUserProjectAccess(uuid: string, projectId: string){
    // Implementation to verify if the user has access to the specified project\

const verificationQuery = query("VERIFY_USER_PROJECT_ACCESS",verifyUserProjectAccessQuery, [uuid, projectId]);
    const result = await verificationQuery;
    // console.log("Verification result:", result);
    return result;
}


