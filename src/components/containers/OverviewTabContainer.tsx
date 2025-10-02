import { Globe, Users, Waypoints } from "lucide-react";
import StatcardContainer from "../cards/stat-card/StatCardContainer";
import StatCardDashboard from "../cards/stat-card/StatCardDashboard";
import { TabsContent } from "../ui/tabs";
import RecentActivityCard from "../cards/RecentActivityCard";
import ActivityTable from "../tables/ActivityTable";

export default function OverviewTabContainer({ data }: { data: Array<{ip: string, time: string, visits: number, device: string, region: string}> }) {
    return(
        <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
            <StatcardContainer>
                <StatCardDashboard title="Unique Users" value="1,204" Icon={Users} />
                <StatCardDashboard title="Total Visits" value="15,302" Icon={Waypoints} />
                <StatCardDashboard title="Top Region" value="North America" Icon={Globe} />
            </StatcardContainer>
            <RecentActivityCard>
                <ActivityTable data={data} />
            </RecentActivityCard>
        </TabsContent>
        
    )
}