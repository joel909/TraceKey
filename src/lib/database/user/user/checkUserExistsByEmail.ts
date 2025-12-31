import { query } from "../../config/db";
import { checkUserExistsByEmailQuery } from "../../config/queries";
export default async function checkUserExistsByEmail(email: string) : Promise<void> {
    await query("CHECK_USER_EXISTS_BY_EMAIL", checkUserExistsByEmailQuery, [email]);
}