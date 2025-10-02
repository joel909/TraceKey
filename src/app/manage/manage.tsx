// app/projects/[id]/page.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Copy, ExternalLink, Settings, Globe, Users, Activity, MapPin, Monitor, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { ProjectData } from '@/app/manage/manage_project_interfaces';

//COMPONENTS
import NavBar from '@/components/navbars/dashboard_navbar';
import SidebarNavBar from '@/components/navbars/sidebar_navbar';
import ManageProjectPageHeading from '@/components/headings/ManageProjectHeading';
import ActivityProjectCardContent from '@/components/cards/manage-project-card/CardContainer';
import AnalyticsContainer from '@/components/containers/AnalyticsContainer';
import OverviewTabContainer from '@/components/containers/OverviewTabContainer';
import TabContainer from '@/components/containers/TabContainer';

export default function ManageProjectPage({ userName, email, project }: { userName: string; email: string; project: ProjectData }) {
    const recentActivity = [
        { ip: "192.168.1.1", time: "10:42 AM", visits: 5, device: "Desktop", region: "USA" },
        { ip: "203.0.113.24", time: "10:35 AM", visits: 2, device: "Mobile", region: "Germany" },
        { ip: "198.51.100.8", time: "10:31 AM", visits: 8, device: "Desktop", region: "Canada" },
        { ip: "192.168.1.2", time: "10:25 AM", visits: 1, device: "Mobile", region: "USA" },
    ];
//   const params = useParams();
//   const projectId = params.id as string;
  
//   const [project, setProject] = useState<ProjectData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Mock data - replace with actual API calls
//   useEffect(() => {
//     const fetchProject = async () => {
//       setIsLoading(true);
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const mockProject: ProjectData = {
//         id: projectId,
//         name: "Sample Project",
//         description: "This is your default project for tracking website visitors and analytics.",
//         url: "https://tracekey.joeljoby.com/sample-project",
//         apiKey: "0awtmqIsxI4C-MfCCCAK0RvOnnmi4jg2FNTxfP5izUk",
//         uniqueVisitors: 1204,
//         totalVisits: 15302,
//         topRegion: "North America",
//         recentActivity: [
//           {
//             id: "1",
//             ipAddress: "192.168.1.1",
//             time: "10:42 AM",
//             visits: 5,
//             device: "Desktop",
//             region: "USA"
//           },
//           {
//             id: "2",
//             ipAddress: "203.0.113.24",
//             time: "10:35 AM",
//             visits: 2,
//             device: "Mobile",
//             region: "Germany"
//           },
//           {
//             id: "3",
//             ipAddress: "198.51.100.8",
//             time: "10:31 AM",
//             visits: 8,
//             device: "Desktop",
//             region: "Canada"
//           },
//           {
//             id: "4",
//             ipAddress: "192.168.1.2",
//             time: "10:25 AM",
//             visits: 1,
//             device: "Mobile",
//             region: "USA"
//           }
//         ]
//       };
      
//       setProject(mockProject);
//       setIsLoading(false);
//     };

//     fetchProject();
//   }, [projectId]);

//   const copyToClipboard = (text: string, label: string) => {
//     navigator.clipboard.writeText(text);
//     toast.success(`${label} copied to clipboard!`);
//   };

//   const getDeviceIcon = (device: string) => {
//     switch (device) {
//       case 'Desktop':
//         return <Monitor className="h-4 w-4" />;
//       case 'Mobile':
//         return <Smartphone className="h-4 w-4" />;
//       default:
//         return <Monitor className="h-4 w-4" />;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen w-full flex-col" style={{ backgroundColor: "rgb(250, 253, 214)" }}>
//         <div className="flex-1 p-6">
//           <div className="animate-pulse">
//             <div className="h-8 bg-[#647FBC]/20 rounded w-1/4 mb-4"></div>
//             <div className="h-4 bg-[#647FBC]/20 rounded w-1/2 mb-8"></div>
//             <div className="grid gap-6 md:grid-cols-3 mb-8">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="h-24 bg-white/70 rounded-xl"></div>
//               ))}
//             </div>
//             <div className="h-96 bg-white/70 rounded-xl"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="flex min-h-screen w-full flex-col" style={{ backgroundColor: "rgb(250, 253, 214)" }}>
//         <div className="flex-1 p-6">
//           <div className="text-center py-12">
//             <h2 className="text-2xl font-bold text-[#647FBC] mb-4">Project Not Found</h2>
//             <p className="text-[#647FBC]/70">The project you're looking for doesn't exist.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

  return (
    <div className="flex min-h-screen w-full flex-col" style={{ backgroundColor: "rgb(250, 253, 214)" }}>
      {/* Header - Same as original */}
        <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b border-gray-300/50 bg-white/40 backdrop-blur-md px-6 z-50 shadow-sm">
            <h1 className="text-2xl font-bold text-[#647FBC]">TraceKey</h1>
            <NavBar userName={userName} userEmail={email} />
        </header>

      <div className="flex flex-1">
        {/* Sidebar - Same as original */}
        <SidebarNavBar active_tab="projects" />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Project Header */}
          <div className="mb-8">
            <ManageProjectPageHeading project={project} />

            {/* Project Details Card */}
            <ActivityProjectCardContent project={project} />
          </div>

          {/* Dashboard Content */}
          <TabContainer tabs={['Overview', 'Analytics']}>
            <OverviewTabContainer data={recentActivity} />
            <AnalyticsContainer />
          </TabContainer>
        </main>
      </div>
    </div>
  );
}
