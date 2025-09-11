// app/dashboard/page.tsx
import Logout from "@/lib/auth/frontend-functions/user-functions/logout";
import {withAuth} from "@/lib/auth/ssr-functions/fetchUserData";
import { AuthenticationError } from "@/lib/errors/AuthenticationError";
import { redirect } from 'next/navigation';
import dashboard from "./dashboard";
// --- Main Dashboard Page ---
export default async  function DashboardPage() {
    let userData = null;
    try{
      userData = (await withAuth())[0];
      console.log("User Data:", userData);      
    }
    catch(e){
      if (e instanceof AuthenticationError) {
        console.log("Authentication Error:", e.message);
        console.log("Logging out user due to authentication error.");
        redirect('/logout');

        //redirect('/signup');
    }
  }
  const userName = userData.name || "Unknown User";
      const email = userData.email || "Unknown Email";
  return dashboard({userName,email});
  
  
}
