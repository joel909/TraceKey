// app/dashboard/page.tsx
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { redirect } from 'next/navigation';
import ProjectsPage from "@/app/(dashboard)/projects/projects_main";
import { DatabaseConnectionError } from "@/lib/errors/extended_errors/DatabaseConnectionError";
import InvalidManageProjectPage from "./manage/[id]/invalidPage";
import { cookies } from "next/headers";
import { projectController } from "@/lib/controllers/project.controller";
import { Project } from "@/lib/interfaces/project_interface";
// --- Main Dashboard Page ---
export default async  function Projects() {
          let projects :  Project []= [];
          try{
              const auth_key = (await cookies()).get('auth_key')?.value
              if (!auth_key) {
                  redirect('/logout');
              }
              projects = await projectController.fetchUserProjects(auth_key);
          }
          catch(e){
            if (e instanceof AuthenticationError) {
                console.log("Authentication Error:", e.message);
                console.log("Logging out user due to authentication error.");
                redirect('/logout');
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
    
            return (
                <InvalidManageProjectPage
                  error="Unknown Error"
                  messageLine1="Unknown Error."
                  messageLine2="Please try again later."
                  reason="UNDEFINED ERROR "
                  projectId=""
                />
              );
        }
        

  console.log("Projects:", projects);

  return ProjectsPage({projects});


}