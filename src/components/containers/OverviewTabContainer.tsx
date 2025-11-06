"use client"
import { Globe, Users, Waypoints } from "lucide-react";
import StatcardContainer from "../cards/stat-card/StatCardContainer";
import StatCardDashboard from "../cards/stat-card/StatCardDashboard";
import { TabsContent } from "../ui/tabs";
import RecentActivityCard from "../cards/RecentActivityCard";
import ActivityTable from "../tables/ActivityTable";
import { LogActivity } from "@/lib/interfaces/deviceInfoInterface";
import { ProjectData } from "@/lib/interfaces/manage_project_interfaces";

export default function OverviewTabContainer({ data, onFetchPage } : { data: ProjectData, onFetchPage?: (page: number) => Promise<LogActivity[]> }) {
    let total_visits;
    try{
        total_visits = parseInt(data.totalVisits);
    }
    catch{
        total_visits = 0;
    }
    // total_visits = 0
    return(
        <TabsContent value="overview" className="space-y-6 text-">
              {/* Stats Cards */}
            <StatcardContainer>
                <StatCardDashboard title="Unique Users" value={`${data.uniqueVisitors}`} Icon={Users} />
                <StatCardDashboard title="Total Visits" value={`${data.totalVisits}`} Icon={Waypoints} />
                <StatCardDashboard title="Top Region" value={`${data.topRegion}`} Icon={Globe} />
            </StatcardContainer>
            <RecentActivityCard>
                {total_visits === 0 ? (
                <ActivityTable data={data.recentActivity} onFetchPage={onFetchPage} />) : (
                    <ActivityTable data={data.recentActivity} totalRecords={total_visits} onFetchPage={onFetchPage} />
                )}
            </RecentActivityCard>
        </TabsContent>
        
    )
}