// app/dashboard/page.tsx
import {AuthorizationError} from "@/lib/errors/extended_errors/AuthorizationError";
import {withAuth} from "@/lib/auth/ssr-functions/fetchUserData";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { redirect } from 'next/navigation';
import ManageProjectPage from "./manage";
import { fetchUserAssociatedProjectsService } from "@/lib/controllers/account.controller";
import{ProjectData} from "../../../../../lib/interfaces/manage_project_interfaces";
import ProjectController from "@/lib/controllers/project.controller";
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";
import { ResourceNotFoundError } from "@/lib/errors/extended_errors/ResourceNotFoundError";
import InvalidManageProjectPage from "./invalidPage";
// --- Main Dashboard Page ---
export default async  function DashboardPage({params}:{params:Promise<{id:string}>}) {
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
const uuid = userData?.uuid || "Unknown UUID";
  const projects = await fetchUserAssociatedProjectsService(uuid);
  console.log("Projects all data:", projects);
  let project_details;
  const { id } = await params;
  // console.log("Fetching details for project ID:", id);
  try{
    // fetching project details if it does not exist then it should display the eror thingy page
    const ProjectControllerObject = new ProjectController();
    const isUserAuthorized = projects.some((project) => project.id === id);
    if (!isUserAuthorized) {
      throw new AuthorizationError('You are not authorized to access this project.');
    }
    project_details = await ProjectControllerObject.fetchSingleProjectDetailsByID(id);


    
  }
  catch(e){
    if(e instanceof ValidationError){
      console.error("Validation Error(invlid UUID format):", e.message);
      return(InvalidManageProjectPage({error:"Invalid project ID",messageLine1:"The project ID provided is not valid.",messageLine2:"Please check the ID and try again.",reason:"Invalid UUID format",projectId:id}))
    }
    else if (e instanceof ResourceNotFoundError) {
      console.error("Resource Not Found Error(Project not found):", e.message);
      return(InvalidManageProjectPage({error:"Project not found",messageLine1:"The project you are looking for does not exist.",messageLine2:"It might have been deleted or the ID is incorrect.",reason:"No project matches the provided ID",projectId:id}))
    }
    else if (e instanceof AuthorizationError) {
      console.error("Authorization Error(Not authorized to access this project):", e.message);
      return(InvalidManageProjectPage({error:"Not authorized",messageLine1:"You do not have permission to access this project.",messageLine2:"Please contact the project owner if you believe this is an error.",reason:"User lacks necessary permissions",projectId:id}))
    }
    console.error("Error fetching project details:", e);
  };
  //  const recentActivity = [
  //       { ip: "192.168.1.1", time: "10:42 AM", visits: 5, device: "Desktop", region: "USA" },
  //       { ip: "203.0.113.24", time: "10:35 AM", visits: 2, device: "Mobile", region: "Germany" },
  //       { ip: "198.51.100.8", time: "10:31 AM", visits: 8, device: "Desktop", region: "Canada" },
  //       { ip: "192.168.1.2", time: "10:25 AM", visits: 1, device: "Mobile", region: "USA" },
  //   ];
    const project: ProjectData = {
        id: project_details?.id || "failed to fetch ID",
        name: project_details?.project_name || "failed to fetch project name",
        description: project_details?.description || "failed to fetch description",
        url: project_details?.site_url || "failed to fetch URL",
        apiKey: project_details?.api_key || "failed to fetch API key",
        uniqueVisitors: 1204,
        totalVisits: 15302,
        topRegion: "North America",
        recentActivity: [
          {
            id: "1",
            ipAddress: "192.168.1.1",
            time: "10:42 AM",
            visits: 5,
            device: "Desktop",
            region: "USA"
          },
          {
            id: "2",
            ipAddress: "203.0.113.24",
            time: "10:35 AM",
            visits: 2,
            device: "Mobile",
            region: "Germany"
          },
          {
            id: "3",
            ipAddress: "198.51.100.8",
            time: "10:31 AM",
            visits: 8,
            device: "Desktop",
            region: "Canada"
          },
          {
            id: "4",
            ipAddress: "192.168.1.2",
            time: "10:25 AM",
            visits: 1,
            device: "Mobile",
            region: "USA"
          }
        ]
      };

    return ManageProjectPage({project});


}
