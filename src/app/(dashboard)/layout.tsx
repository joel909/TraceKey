
import NavBar from "@/components/navbars/dashboard_navbar";
import SidebarNavBar from "@/components/navbars/sidebar_navbar";
import { withAuth } from "@/lib/auth/ssr-functions/fetchUserData";
import { AuthenticationError } from "@/lib/errors/AuthenticationError";
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  let userData = null;
      try{
        userData = (await withAuth())[0];
        // console.log("User Data:", userData);      
      }
      catch(e){
        if (e instanceof AuthenticationError) {
          console.log("Authentication Error:", e.message);
          console.log("Logging out user due to authentication error.");
          redirect('/logout');
  
          //redirect('/signup');
      }
    }
    const userName = userData && userData.name ? userData.name : "Unknown User";
    const email = userData && userData.email ? userData.email : "Unknown Email";
  
    
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