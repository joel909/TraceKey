// app/dashboard/page.tsx
import Logout from "@/lib/auth/frontend-functions/user-functions/logout";
import {withAuth} from "@/lib/auth/ssr-functions/fetchUserData";
import { AuthenticationError } from "@/lib/errors/AuthenticationError";
import { redirect } from 'next/navigation';
import ManageProjectPage from "./manage";
import { fetchUserAssociatedProjectsService } from "@/lib/controllers/account.controller";
import{ProjectData} from "@/app/manage/manage_project_interfaces";
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
    const uuid = userData.uuid || "Unknown UUID";
    const project: ProjectData = {
        id: "DDEDRDFD-4545-4545-4545-DFDFD4545DDF",
        name: "Sample Project",
        description: "This is your default project for tracking website visitors and analytics.",
        url: "https://tracekey.joeljoby.com/sample-project",
        apiKey: "0awtmqIsxI4C-MfCCCAK0RvOnnmi4jg2FNTxfP5izUk",
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

    return ManageProjectPage({userName,email,project});


}
