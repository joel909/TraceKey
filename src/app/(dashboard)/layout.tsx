
import NavBar from "@/components/navbars/dashboard_navbar";
import SidebarNavBar from "@/components/navbars/sidebar_navbar";
import { cookies } from 'next/headers'
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { DatabaseConnectionError } from "@/lib/errors/extended_errors/DatabaseConnectionError";
import { redirect } from 'next/navigation';
import InvalidManageProjectPage from "@/app/(dashboard)/projects/manage/[id]/invalidPage";
import {authController} from "@/lib/controllers/auth.controller";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let username;
  let email;
  let AuthRequest;
      try{
        const auth_key = (await cookies()).get('auth_key')?.value
        AuthRequest = await authController.verifyAuthKey(auth_key);
        if(!AuthRequest || !AuthRequest.email || !AuthRequest.name){
          throw new AuthenticationError('Invalid authentication key.');
        }
        username = AuthRequest.name;
        email = AuthRequest.email;
        // console.log("User Data:", userData);
      }
      catch(e){
      if (e instanceof AuthenticationError) {;
          redirect('/logout');
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

  return(
    <div className="flex min-h-screen w-full flex-col" style={{ backgroundColor: '#FAFDD6' }}>
      {/* ===== Subtle Header Bar ===== */}
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b border-gray-300/50 bg-white/40 backdrop-blur-md px-6 z-50 shadow-sm">
        <h1 className="text-2xl font-bold text-[#647FBC]">TraceKey</h1>
        <NavBar userName={username ?? ""} userEmail={email ?? ""} />
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

