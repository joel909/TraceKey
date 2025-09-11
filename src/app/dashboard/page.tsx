// app/dashboard/page.tsx
import { cookies } from 'next/headers'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Users,
  Globe,
  Waypoints,
  Smartphone,
  Monitor
} from "lucide-react";
import NavBar from "@/components/navbars/dashboard_navbar";
import SidebarNavBar from "@/components/navbars/sidebar_navbar";
import {withAuth} from "@/lib/auth/ssr-functions/fetchUserData";
import { AuthenticationError } from "@/lib/errors/AuthenticationError";
import { redirect } from 'next/dist/server/api-utils';





// --- Reusable Component for Analytics Cards (Using your blue) ---
function StatCard({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) {
  return (
    <Card className="shadow-sm border border-gray-200/60 bg-white/70 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[#647FBC]">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-[#647FBC]" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#647FBC]">{value}</div>
      </CardContent>
    </Card>
  );
}

// --- Mock Data for the Table ---
const recentActivity = [
  { ip: "192.168.1.1", time: "10:42 AM", visits: 5, device: "Desktop", region: "USA" },
  { ip: "203.0.113.24", time: "10:35 AM", visits: 2, device: "Mobile", region: "Germany" },
  { ip: "198.51.100.8", time: "10:31 AM", visits: 8, device: "Desktop", region: "Canada" },
  { ip: "192.168.1.2", time: "10:25 AM", visits: 1, device: "Mobile", region: "USA" },
];

// --- Main Dashboard Page ---
export default async  function DashboardPage() {
  let userData = null;
  try{
    userData = (await withAuth())[0];
    console.log("User Data:", userData);
  }
  catch(e){
    if (e instanceof AuthenticationError) {
      console.log("Authentication Error:", e.message);
      return {redirect: {destination: '/login',permanent: false}};
  }
}

  const userName = userData.name || "Unknown User";
  const email = userData.email || "Unknown Email";


  return (
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
          <h2 className="text-3xl font-bold tracking-tight text-[#647FBC] mb-6">
            Dashboard
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <StatCard title="Unique Users" value="1,204" icon={Users} />
            <StatCard title="Total Visits" value="15,302" icon={Waypoints} />
            <StatCard title="Top Region" value="North America" icon={Globe} />
          </div>

          {/* --- Recent Activity Table (Using your blue) --- */}
          <Card className="shadow-sm border border-gray-200/60 bg-white/70 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-200/50">
              <CardTitle className="text-xl font-bold text-[#647FBC]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200/60">
                    <TableHead className="text-[#647FBC] font-semibold py-4 px-6">IP Address</TableHead>
                    <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Time</TableHead>
                    <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Visits</TableHead>
                    <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Device</TableHead>
                    <TableHead className="text-[#647FBC] font-semibold py-4 px-6">Region</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((activity, index) => (
                    <TableRow 
                      key={activity.ip} 
                      className={`border-b border-gray-100/60 hover:bg-gray-50/50 transition-colors ${
                        index % 2 === 0 ? 'bg-transparent' : 'bg-gray-50/30'
                      }`}
                    >
                      <TableCell className="font-medium text-[#647FBC] py-4 px-6">{activity.ip}</TableCell>
                      <TableCell className="text-[#647FBC] py-4 px-6">{activity.time}</TableCell>
                      <TableCell className="text-[#647FBC] py-4 px-6">{activity.visits}</TableCell>
                      <TableCell className="flex items-center gap-2 text-[#647FBC] py-4 px-6">
                        {activity.device === "Desktop" ? 
                          <Monitor className="h-4 w-4 text-[#647FBC]" /> : 
                          <Smartphone className="h-4 w-4 text-[#647FBC]" />
                        }
                        {activity.device}
                      </TableCell>
                      <TableCell className="text-[#647FBC] py-4 px-6">{activity.region}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
