import { query } from "../../config/db";
import { fetchUserByEmailQuery } from "../../config/queries";
import { UserInfoInterface } from "@/lib/interfaces/UserInterfaces";

export default async function fetchUserInfo(api_key: string) : Promise<UserInfoInterface> {
        const user = await query("FETCH_USER",fetchUserByEmailQuery, [api_key]);
        const response: UserInfoInterface = {
            uuid: user[0].uuid,
            email: user[0].email,
            name: user[0].name
        };
        // console.log("Fetched User:", user);
        // if (user.length === 0) {
        //     throw new AuthenticationError('Invalid authentication key.');
        // }
        return response;
    

}
    
