// app/dashboard/page.tsx
import { SingleProjectDetails } from "@/lib/interfaces/project_interface";
import dashboard from "./dashboard";
import { LogActivity, LogActivityStaticsInterface } from "@/lib/interfaces/deviceInfoInterface";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { projectController } from "@/lib/controllers/project.controller";
import { DashboardData } from "@/lib/interfaces/manage_project_interfaces";
// --- Main Dashboard Page ---
export default async  function DashboardPage() {
  //HERE WIRITE THE FUNCTION TO GET THE COLLECTIVE DATA OF ALL THE USERS PROJECTS AND PASS IT ON AND MAY THE DATA DYNAMIC
  let projectDetails : SingleProjectDetails;
  let VistorIpLogs : LogActivity[];
  let VistorLogStatics : LogActivityStaticsInterface;
  let TopRegion : string;
  try{
    const auth_key = (await cookies()).get('auth_key')?.value
    if (!auth_key) {
        redirect('/logout');
    }
    [VistorIpLogs, VistorLogStatics,TopRegion] = await projectController.fetchAllUsersProjectLogs(auth_key);
    }catch(e:any){
        console.log("Authentication Error:",e.message);
        console.log("Logging out user due to authentication error.");
        redirect('/logout');
    }
    const projectData: DashboardData = {
            uniqueVisitors: VistorLogStatics.uniqueVisitors,
            totalVisits: VistorLogStatics.totalVisits,
            topRegion: TopRegion,
            recentActivity: VistorIpLogs || []
          }

  return dashboard(projectData);
  
  
}
