import { query } from "../../config/db";
import { verifyApiKeyQuery } from "../../config/queries";

export default async function verifyApiKey(apiKey: string) {
    const verifyApiKeyQueryRequest = await query("VERIFY_API_KEY",verifyApiKeyQuery, [apiKey]);    
}