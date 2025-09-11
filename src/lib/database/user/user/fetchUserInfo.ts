import { AuthenticationError } from "@/lib/errors/AuthenticationError";
import { query } from "../../config/db";
import { fetchUserByEmailQuery } from "../../config/queries";
export default async function fetchUserInfo(api_key: string) {
    const user = await query("FETCH USER",fetchUserByEmailQuery, [api_key]);
    console.log("Fetched User:", user);
    if (user.length === 0) {
        throw new AuthenticationError('Invalid authentication key.');
    }
    return user;
}