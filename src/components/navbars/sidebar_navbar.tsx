"use client";
import { LayoutDashboard, FolderKanban, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNavBar() {
  const pathname = usePathname();
  const activeTabClass = "flex items-center gap-3 rounded-lg bg-[#647FBC] px-3 py-2 text-white font-medium shadow-sm hover:bg-[#5a6fb0] transition-colors";
  const inactiveTabClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-[#647FBC] hover:bg-white/50 transition-colors font-medium";
  const subActiveTabClass = "flex items-center gap-3 rounded-lg bg-[#647FBC]/10 px-3 py-2 text-[#647FBC] font-medium";
  const subInactiveTabClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-[#647FBC]/80 hover:bg-white/50 transition-colors font-medium";
  const isDashboardActive = pathname.startsWith("/dashboard");
  const isCustomerActive = pathname.startsWith("/dashboard/customer") || pathname === "/dashboard";
  const isAdminActive = pathname.startsWith("/dashboard/admin");
  const isProjectsActive = pathname.startsWith("/projects");

  return (
    <aside className="w-64 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-gray-200/60">
      <nav className="flex flex-col p-4 space-y-2 mt-4">
        <Link
          href="/dashboard/customer"
          className={isDashboardActive ? activeTabClass : inactiveTabClass}
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <div className="ml-3 flex flex-col gap-2 border-l border-[#647FBC]/20 pl-3">
          <Link
            href="/dashboard/customer"
            className={isCustomerActive ? subActiveTabClass : subInactiveTabClass}
          >
            <LayoutDashboard className="h-4 w-4" />
            Customer Frontend Dashboard
          </Link>
          <Link
            href="/dashboard/admin"
            className={isAdminActive ? subActiveTabClass : subInactiveTabClass}
          >
            <Shield className="h-4 w-4" />
            Admin Frontend Dashboard
          </Link>
        </div>
        <Link
          href="/projects"
          className={isProjectsActive ? activeTabClass : inactiveTabClass}
        >
          <FolderKanban className="h-4 w-4" />
          Projects
        </Link>
      </nav>
    </aside>
  )
}
