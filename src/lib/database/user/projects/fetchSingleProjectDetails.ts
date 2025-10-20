import {query} from "../../config/db";
import {  fetchSingleProjectDataByIDQuery } from "../../config/queries";
export default async function fetchSingleProjectDataByID(id: string) {
    try{
        const requestDetails = await query("FETCH_PROJECT_DETAILS_BY_ID",fetchSingleProjectDataByIDQuery, [id]);
        console.log("Fetched Project Details:", requestDetails);
        return requestDetails[0]
        // console.log("Project details fetched:", requestDetails);
    }
    catch (error) {
        console.error("Error fetching project details:", error);
        throw error;
    }
}