import AnalyticsContainer from "@/components/containers/AnalyticsContainer";
import OverviewTabContainer from "@/components/containers/OverviewTabContainer";
import TabContainer from "@/components/containers/TabContainer";
import { ProjectData } from "../../../../../lib/interfaces/manage_project_interfaces";
import ManageProjectPageHeading from '@/components/headings/ManageProjectHeading';
import ActivityProjectCardContent from '@/components/cards/manage-project-card/CardContainer';
import {recentActivity} from "../../../../../lib/interfaces/manage_project_interfaces"
export default function ValidManageProjectPage({project,recentActivity}: {project: ProjectData ,recentActivity:recentActivity[]}) {
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
                <OverviewTabContainer data={recentActivity} />
                <AnalyticsContainer />
            </TabContainer>
        </main>
    )
}