import {
  Users,
  Globe,
  Waypoints,

} from "lucide-react";

import StatCardDashboard from "@/components/cards/stat-card/StatCardDashboard";
import PageTitle1 from "@/components/headings/PageTitle1";
import NavBar from "@/components/navbars/dashboard_navbar";
import SidebarNavBar from "@/components/navbars/sidebar_navbar";
import StatcardContainer from "@/components/cards/stat-card/StatCardContainer";
import RecentActivityCard from "@/components/cards/RecentActivityCard";
import ActivityTable from "@/components/tables/ActivityTable";
import Logout from "@/lib/auth/frontend-functions/user-functions/logout";
export default async function dashboard({userName,email}: {userName: string, email: string}) {
    const recentActivity = [
        { ip: "192.168.1.1", time: "10:42 AM", visits: 5, device: "Desktop", region: "USA" },
        { ip: "203.0.113.24", time: "10:35 AM", visits: 2, device: "Mobile", region: "Germany" },
        { ip: "198.51.100.8", time: "10:31 AM", visits: 8, device: "Desktop", region: "Canada" },
        { ip: "192.168.1.2", time: "10:25 AM", visits: 1, device: "Mobile", region: "USA" },
    ];
    return(
    <div className="flex min-h-screen w-full flex-col" style={{ backgroundColor: '#FAFDD6' }}>
      {/* ===== Subtle Header Bar ===== */}
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b border-gray-300/50 bg-white/40 backdrop-blur-md px-6 z-50 shadow-sm">
        <h1 className="text-2xl font-bold text-[#647FBC]">TraceKey</h1>
        <NavBar userName={userName} userEmail={email} />
      </header>

      <div className="flex flex-1">
        {/* ===== Subtle Sidebar Navigation ===== */}
        <SidebarNavBar active_tab="dashboard" />

        {/* ===== Main Content Area ===== */}
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
      </div>
    </div>
    )
}