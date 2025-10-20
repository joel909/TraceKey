import {Users,Globe,Waypoints} from "lucide-react";
import StatCardDashboard from "@/components/cards/stat-card/StatCardDashboard";
import PageTitle1 from "@/components/headings/PageTitle1";
import StatcardContainer from "@/components/cards/stat-card/StatCardContainer";
import RecentActivityCard from "@/components/cards/RecentActivityCard";
import ActivityTable from "@/components/tables/ActivityTable";

export default async function dashboard() {
    const recentActivity = [
        { ip: "192.168.1.1", time: "10:42 AM", visits: 5, device: "Desktop", region: "USA" },
        { ip: "203.0.113.24", time: "10:35 AM", visits: 2, device: "Mobile", region: "Germany" },
        { ip: "198.51.100.8", time: "10:31 AM", visits: 8, device: "Desktop", region: "Canada" },
        { ip: "192.168.1.2", time: "10:25 AM", visits: 1, device: "Mobile", region: "USA" },
    ];
    return(
      <main className="flex-1 p-6">
        <PageTitle1 Heading="Dashboard" />
        <StatcardContainer>
          <StatCardDashboard title="Unique Users" value="1,204" Icon={Users} />
          <StatCardDashboard title="Total Visits" value="15,302" Icon={Waypoints} />
          <StatCardDashboard title="Top Region" value="North America" Icon={Globe} />
        </StatcardContainer>
        {/* --- Recent Activity Table (Using your blue) --- */}
        <RecentActivityCard>
          <ActivityTable data={recentActivity} />
        </RecentActivityCard>
      </main>

    )
}