import {Pool} from "pg";
import dotenv from "dotenv";
import { createDatabaseError } from "@/lib/errors/error-handler";
import validateDatabaseResult from "./databaseResultValidator";


dotenv.config();
// console.log("Database URL:", process.env.POSTGRES_URL);
export const pool = new Pool({
    ssl: {
      rejectUnauthorized: false, // required for most cloud DBs
    },
    connectionString: process.env.POSTGRES_URL,
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function query(purpose:string,text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params);
    //Request Validation
    validateDatabaseResult(result, purpose);
    return result.rows;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
   catch (err:any) {
    throw createDatabaseError(err, text, purpose);
    // Re-throw the error after handling
}
  
}

