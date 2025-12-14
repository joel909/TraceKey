
// app/projects/[id]/page.tsx
//interface for project data
import { ProjectData } from '@/lib/interfaces/manage_project_interfaces';
//COMPONENTS
import ManageProjectPageHeading from '@/components/headings/ManageProjectHeading';
import ActivityProjectCardContent from '@/components/cards/manage-project-card/CardContainer';
import TabContainer from '@/components/containers/TabContainer';
import ProjectsOverviewWrapper from '@/components/containers/ProjectsOverviewWrapper';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ManageProjectPage({projectData,error, }: {projectData: ProjectData,error?:string }) {
  // Wrapper function that accepts only page number
  
  return (
        <main className="flex-1 p-6">
          {/* Project Header */}
          <div className="mb-8">
            <ManageProjectPageHeading project={projectData} />

            {/* Project Details Card */}
            <ActivityProjectCardContent project={projectData} />
          </div>

          {/* Dashboard Content */}
          <TabContainer tabs={['Overview']}>
            <ProjectsOverviewWrapper project_data={projectData}  />
            {/* <AnalyticsContainer /> */}
          </TabContainer>
        </main>
  );
}