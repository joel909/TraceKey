// app/dashboard/page.tsx
import Logout from "@/lib/auth/frontend-functions/user-functions/logout";
import {withAuth} from "@/lib/auth/ssr-functions/fetchUserData";
import { AuthenticationError } from "@/lib/errors/AuthenticationError";
import { redirect } from 'next/navigation';
import dashboard from "./dashboard";
// --- Main Dashboard Page ---
export default async  function DashboardPage() {
  //HERE WIRITE THE FUNCTION TO GET THE COLLECTIVE DATA OF ALL THE USERS PROJECTS AND PASS IT ON AND MAY THE DATA DYNAMIC
  return dashboard();
  
  
}
