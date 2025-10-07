import { cookies } from 'next/headers'
import { ValidationError } from "@/lib/errors/ValidationError";
import fetchUserInfo from "@/lib/database/user/user/fetchUserInfo";

// pages/dashboard.tsx
export async function withAuth() {
        const auth_key = (await cookies()).get('auth_key')?.value
        // console.log("the Auth key is ",auth_key)
    try{
        if(auth_key){
            const userData = await fetchUserInfo(auth_key)
            return userData
        }
        else{
            throw new ValidationError('No authentication key provided.', 'auth_key');
        }
        
    }
    catch(e){  
        throw e;
    }
  

  
}