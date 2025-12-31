import { query } from "../../../config/db";
import { verifyApiKeyQuery } from "../../../config/queries";

export default async function verifyApiKey(apiKey: string) {
    await query("VERIFY_API_KEY",verifyApiKeyQuery, [apiKey]);    
}