// app/dashboard/page.tsx
import {withAuth} from "@/lib/auth/ssr-functions/fetchUserData";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { redirect } from 'next/navigation';
import ProjectsPage from "@/app/(dashboard)/projects/projects_main";
import { fetchUserAssociatedProjectsService } from "@/lib/controllers/account.controller";
import { DatabaseConnectionError } from "@/lib/errors/extended_errors/DatabaseConnectionError";
import InvalidManageProjectPage from "./manage/[id]/invalidPage";
// --- Main Dashboard Page ---
export default async  function Projects() {
      let userData;
      let AuthRequest;
          try{
            AuthRequest = await withAuth();
            if(!AuthRequest){
              redirect('/logout');
            }
            // console.log("User Data:", userData);      
          }
          catch(e){
          if (e instanceof AuthenticationError) {
              console.log("Authentication Error:", e.message);
              console.log("Logging out user due to authentication error.");
              redirect('/logout');
              //redirect('/signup');
          }
          else if (e instanceof DatabaseConnectionError){
            console.error("Database Connection Error On Server End:", e.message);
            return (
              <InvalidManageProjectPage
                error="Database Connection Error"
                messageLine1="Database Connection Error."
                messageLine2="Please try again later."
                reason="Could not connect to the database."
                projectId=""
              />
            );
          }
    
          console.error("Error fetching user data in layout:", e);
        }
        
        userData = AuthRequest && AuthRequest[0] ? AuthRequest[0] : null;

  const uuid = userData.uuid;
  const projects = await fetchUserAssociatedProjectsService(uuid);
  console.log("Projects:", projects);

  return ProjectsPage({projects,uuid});


}
