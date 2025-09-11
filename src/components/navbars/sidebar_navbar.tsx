import {LayoutDashboard,FolderKanban} from "lucide-react";
import Link from "next/link";

export default function SidebarNavBar({ active_tab }: { active_tab: string }) {
    const activeTabClass = "flex items-center gap-3 rounded-lg bg-[#647FBC] px-3 py-2 text-white font-medium shadow-sm hover:bg-[#5a6fb0] transition-colors"
    const inactiveTabClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-[#647FBC] hover:bg-white/50 transition-colors font-medium"

    return (
       <aside className="w-64 flex-shrink-0 bg-white/60 backdrop-blur-sm border-r border-gray-200/60">
          <nav className="flex flex-col p-4 space-y-2 mt-4">
            <Link
              href="/dashboard"
              className={active_tab === "dashboard" ? activeTabClass : inactiveTabClass}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/projects"
              className={active_tab === "projects" ? activeTabClass : inactiveTabClass}
            >
              <FolderKanban className="h-4 w-4" />
              Projects
            </Link>
          </nav>
        </aside>
    )
}