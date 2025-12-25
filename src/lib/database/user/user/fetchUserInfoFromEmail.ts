import { query } from "../../config/db";
import { fetchUserFromEmailQuery } from "../../config/queries";

export default async function fetchUserByEmailQuery(email:string) : Promise<string> {
    const result = await query("FETCH_USER_BY_EMAIL", fetchUserFromEmailQuery, [email]);
    return result[0].uuid;
}