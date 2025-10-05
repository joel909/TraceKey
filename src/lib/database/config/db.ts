import {Pool} from "pg";
import dotenv from "dotenv";
import { AuthenticationError } from "@/lib/errors/AuthenticationError";
import { ValidationError } from '../../errors/ValidationError';
import { ResourceNotFoundError } from "@/lib/errors/ResourceNotFoundError";


dotenv.config();
console.log("Database URL:", process.env.POSTGRES_URL);
export const pool = new Pool({
    ssl: {
      rejectUnauthorized: false, // required for most cloud DBs
    },
    connectionString: process.env.POSTGRES_URL,
});

export async function query(purpose:string,text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params);
    if(purpose === "FETCH_PROJECT_DETAILS_BY_ID" && result.rows.length === 0){
      throw new ResourceNotFoundError('No project found with the given ID.');  
    }
    return result.rows;
  } catch (err:any) {
    //console.error(`ERROR : Failed to execute query at db.ts,query: \n\t${err}`);
    
    if(purpose === "CREATE USER" && err.code === '23505' && err.constraint === 'users_email_key') {
        throw new ValidationError('A user with this email or username already exists.', 'email');
    }
    else if (purpose == "FETCH_PROJECT_DETAILS_BY_ID" && err.code === "22P02"){
      throw new ValidationError('The provided project ID is invalid.', 'project_id');
    }
    else if(err instanceof ResourceNotFoundError){
      throw new ResourceNotFoundError(`Requested Project not found`);
    }
    if(err instanceof AuthenticationError){
    throw new AuthenticationError(`ERROR : Failed to execute query at db.ts,query: \n\t${err}`);
  }
    throw new Error(`ERROR : Failed to execute query at db.ts,query: \n\t${err} the error code is ${err.code}`);
}
  
}

