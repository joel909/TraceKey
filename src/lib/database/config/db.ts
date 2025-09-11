import {Pool} from "pg";
import dotenv from "dotenv";
import { AuthenticationError } from "@/lib/errors/AuthenticationError";
import { ValidationError } from '../../errors/ValidationError';


dotenv.config();

export const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

export async function query(purpose:string,text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params);
    return result.rows;
  } catch (err:any) {
    //console.error(`ERROR : Failed to execute query at db.ts,query: \n\t${err}`);
    if(purpose === "CREATE USER" && err.code === '23505' && err.constraint === 'users_email_key') {
        throw new ValidationError('A user with this email or username already exists.', 'email');
    }
    if(err instanceof AuthenticationError)
    throw new AuthenticationError(`ERROR : Failed to execute query at db.ts,query: \n\t${err}`);
  }
  throw new Error(`ERROR : Failed to execute query at db.ts,query: \n\tUnknown error`);
}

