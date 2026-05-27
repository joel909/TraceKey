import {Pool} from "pg";
import dotenv from "dotenv";
import { createDatabaseError } from "@/lib/errors/error-handler";
import validateDatabaseResult from "./databaseResultValidator";


dotenv.config();
//connection pooling insted of creating a new connection for every query
export const pool = new Pool({
  //If ur database is exposed over the internet, it's crucial to use SSL to encrypt the connection and protect sensitive data from being intercepted by malicious actors. However, if your database is hosted in a secure environment (like a private network or local development), you might choose to disable SSL for simplicity and performance reasons.
    // ssl: {
    //   rejectUnauthorized: false, 
    // },
    connectionString: process.env.POSTGRES_URL,
});
export async function query(purpose:string,query: string, params?: any[]) {
  try {
    const result = await pool.query(query, params);
    //Request Validation
    validateDatabaseResult(result, purpose);
    return result.rows;
  }
   catch (err:any) {
    throw createDatabaseError(err, query, purpose);
    // Re-throw the error after handling
}
  
}
