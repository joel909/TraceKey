// app/projects/[id]/page.tsx
//interface for project data
import { ProjectData } from '@/lib/interfaces/manage_project_interfaces';
//COMPONENTS
import ManageProjectPageHeading from '@/components/headings/ManageProjectHeading';
import ActivityProjectCardContent from '@/components/cards/manage-project-card/CardContainer';
import AnalyticsContainer from '@/components/containers/AnalyticsContainer';
import OverviewTabContainer from '@/components/containers/OverviewTabContainer';
import TabContainer from '@/components/containers/TabContainer';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ManageProjectPage({project,error, }: {project: ProjectData,error?:string }) {
    // const recentActivity = [
    //     { ip: "192.168.1.1", time: "10:42 AM", visits: 5, device: "Desktop", region: "USA" },
    //     { ip: "203.0.113.24", time: "10:35 AM", visits: 2, device: "Mobile", region: "Germany" },
    //     { ip: "198.51.100.8", time: "10:31 AM", visits: 8, device: "Desktop", region: "Canada" },
    //     { ip: "192.168.1.2", time: "10:25 AM", visits: 1, device: "Mobile", region: "USA" },
    // ];

  return (
        <main className="flex-1 p-6">
          {/* Project Header */}
          <div className="mb-8">
            <ManageProjectPageHeading project={project} />

            {/* Project Details Card */}
            <ActivityProjectCardContent project={project} />
          </div>

          {/* Dashboard Content */}
          <TabContainer tabs={['Overview', 'Analytics']}>
            <OverviewTabContainer data={project.recentActivity} />
            <AnalyticsContainer />
          </TabContainer>
        </main>
  );
}
