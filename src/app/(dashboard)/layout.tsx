
import NavBar from "@/components/navbars/dashboard_navbar";
import SidebarNavBar from "@/components/navbars/sidebar_navbar";
import { withAuth } from "@/lib/auth/ssr-functions/fetchUserData";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { DatabaseConnectionError } from "@/lib/errors/extended_errors/DatabaseConnectionError";
import { redirect } from 'next/navigation';
import InvalidManageProjectPage from "@/app/(dashboard)/projects/manage/[id]/invalidPage";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  
  let userData;
  let AuthRequest;
      try{
        AuthRequest = await withAuth();
        // console.log("User Data:", userData);      
      }
      catch(e){
      if (e instanceof AuthenticationError) {
          console.log("Authentication Error:", e.message);
          console.log("Logging out user due to authentication error.");
          redirect('/logout');
          //redirect('/signup');
      }
      else if (e instanceof DatabaseConnectionError){
        console.error("Database Connection Error On Server End:", e.message);
        return (
          <InvalidManageProjectPage
            error="Database Connection Error"
            messageLine1="Database Connection Error."
            messageLine2="Please try again later."
            reason="Could not connect to the database."
            projectId=""
          />
        );
      }

      console.error("Error fetching user data in layout:", e);
    }

    userData = AuthRequest && AuthRequest[0] ? AuthRequest[0] : null;
    const userName = userData?.name ?? "";
    const email = userData?.email ?? "";

  return(
    <div className="flex min-h-screen w-full flex-col" style={{ backgroundColor: '#FAFDD6' }}>
      {/* ===== Subtle Header Bar ===== */}
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b border-gray-300/50 bg-white/40 backdrop-blur-md px-6 z-50 shadow-sm">
        <h1 className="text-2xl font-bold text-[#647FBC]">TraceKey</h1>
        <NavBar userName={userName} userEmail={email} />
      </header>

      <div className="flex flex-1">
        {/* ===== Subtle Sidebar Navigation ===== */}
        <SidebarNavBar/>

        {/* ===== Main Content Area ===== */}
          {children}
        
      </div>
    </div>
  )
}