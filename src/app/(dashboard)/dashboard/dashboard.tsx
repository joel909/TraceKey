import PageTitle1 from "@/components/headings/PageTitle1";
import { DashboardData, ProjectData } from "@/lib/interfaces/manage_project_interfaces";
import ProjectsOverviewWrapper from "@/components/containers/ProjectsOverviewWrapper";
import TabContainer from "@/components/containers/TabContainer";
import { Project } from "@/lib/interfaces/project_interface";

export default async function dashboard(projectData: DashboardData, showOverviewTab: boolean = true) {
  console.log("Dashboard Project Data:", projectData);
  const scaffoldProjectData : ProjectData = {
    id: "scaffold-id",
    name: "Scaffold Project",
    description: "This is a scaffold project used for testing and development purposes.",
    url: "place_holder.com",
    apiKey: "scaffold-api-key",
    uniqueVisitors: projectData.uniqueVisitors || "0",
    totalVisits:  projectData.totalVisits || "0",
    topRegion: projectData.topRegion || "Unknown",
    recentActivity: projectData.recentActivity || []
  }

    return(
      <main className="flex-1 p-6">
        <PageTitle1 Heading="Dashboard" />
        {/* --- Recent Activity Table (Using your blue) --- */}
        <TabContainer tabs={showOverviewTab ? ['Overview'] : []}>
          {showOverviewTab && <ProjectsOverviewWrapper project_data={scaffoldProjectData} isDashboard={true} />}
          {/* <AnalyticsContainer /> */}
        </TabContainer>
      </main>
    )
}