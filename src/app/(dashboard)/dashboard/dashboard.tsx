import {Users,Globe,Waypoints} from "lucide-react";
import StatCardDashboard from "@/components/cards/stat-card/StatCardDashboard";
import PageTitle1 from "@/components/headings/PageTitle1";
import StatcardContainer from "@/components/cards/stat-card/StatCardContainer";
import RecentActivityCard from "@/components/cards/RecentActivityCard";
import ActivityTable from "@/components/tables/ActivityTable";
import { LogActivity } from "@/lib/interfaces/deviceInfoInterface";

export default async function dashboard() {
    const recentActivity: LogActivity[] = [
  { 
    ip: "192.168.1.1", 
    time: "10:42 AM", 
    device: "Desktop", 
    region: "USA",
    interactionID: "INT-001-2024-11-06",
    additionalDeviceInfo: "Windows 11, Chrome 119",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    referrerUrl: "https://google.com/search?q=example",
    cookies: "session_id=abc123xyz; user_pref=dark_mode"
  },
  { 
    ip: "203.0.113.24", 
    time: "10:35 AM", 
    device: "Mobile", 
    region: "Germany",
    interactionID: "INT-002-2024-11-06",
    additionalDeviceInfo: "iOS 17.1, Safari",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1",
    referrerUrl: "https://twitter.com/post/12345",
    cookies: "session_id=def456uvw; lang=de"
  },
  { 
    ip: "198.51.100.8", 
    time: "10:31 AM", 
    device: "Desktop", 
    region: "Canada",
    interactionID: "INT-003-2024-11-06",
    additionalDeviceInfo: "macOS Sonoma, Firefox 120",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0",
    referrerUrl: "https://reddit.com/r/programming",
    cookies: "session_id=ghi789rst; timezone=EST"
  },
  { 
    ip: "192.168.1.2", 
    time: "10:25 AM", 
    device: "Mobile", 
    region: "USA",
    interactionID: "INT-004-2024-11-06",
    additionalDeviceInfo: "Android 14, Chrome Mobile",
    userAgent: "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.66 Mobile Safari/537.36",
    referrerUrl: "direct",
    cookies: "session_id=jkl012mno; new_user=true"
  }
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