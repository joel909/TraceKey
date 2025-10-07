// app/dashboard/page.tsx
import {withAuth} from "@/lib/auth/ssr-functions/fetchUserData";
import { AuthenticationError } from "@/lib/errors/AuthenticationError";
import { redirect } from 'next/navigation';
import ProjectsPage from "@/app/(dashboard)/projects/projects_main";
import { fetchUserAssociatedProjectsService } from "@/lib/controllers/account.controller";
// --- Main Dashboard Page ---
export default async  function Projects() {
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
  if (!userData?.uuid){
    redirect('/logout');
  }
  const uuid = userData?.uuid || "Unknown UUID";

  
  const projects = await fetchUserAssociatedProjectsService(uuid);
  console.log("Projects:", projects);

  return ProjectsPage({projects});


}
