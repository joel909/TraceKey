import { cookies } from 'next/headers'
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";
import fetchUserInfo from "@/lib/database/user/user/fetchUserInfo";
import { AuthenticationError } from '@/lib/errors/extended_errors/AuthenticationError';
import { DatabaseConnectionError } from '@/lib/errors/extended_errors/DatabaseConnectionError';

// pages/dashboard.tsx
export async function withAuth() {
    try{
        const auth_key = (await cookies()).get('auth_key')?.value
        if(auth_key){
            const userData = await fetchUserInfo(auth_key)
            return userData
        }
        else{
            throw new ValidationError('No authentication key provided.', 'auth_key');
        }
        
    }
    catch(e){  
        if (e instanceof ValidationError) {
            console.log("Validation Error:", e.message);
            throw e;
        }
        else if (e instanceof AuthenticationError) {
            console.log("Authentication Error:", e.message);
            throw e;
        }
        else if(e instanceof DatabaseConnectionError){
            console.log("Database Connection Error:", e.message);
            throw e;
        }
    }
  

  
}