"use client";
import {
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  Menu,
  Shield,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DESKTOP_SIDEBAR_STORAGE_KEY = "tracekey.desktopSidebarCollapsed";

export default function SidebarNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const pathname = usePathname();
  const activeTabClass = "flex items-center gap-3 rounded-lg bg-[#647FBC] px-3 py-2 text-white font-medium shadow-sm hover:bg-[#5a6fb0] transition-colors";
  const inactiveTabClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-[#647FBC] hover:bg-white/50 transition-colors font-medium";
  const subActiveTabClass = "flex items-center gap-3 rounded-lg bg-[#647FBC]/10 px-3 py-2 text-[#647FBC] font-medium";
  const subInactiveTabClass = "flex items-center gap-3 rounded-lg px-3 py-2 text-[#647FBC]/80 hover:bg-white/50 transition-colors font-medium";
  const isDashboardActive = pathname.startsWith("/dashboard");
  const isCustomerActive = pathname.startsWith("/dashboard/customer") || pathname === "/dashboard";
  const isAdminActive = pathname.startsWith("/dashboard/admin");
  const isProjectsActive = pathname.startsWith("/projects");
  const withDesktopState = (baseClass: string) =>
    [
      baseClass,
      desktopCollapsed ? "justify-center px-2" : "",
    ].join(" ");
  const labelClass = desktopCollapsed ? "hidden" : "inline";
  const subNavClass = [
    "flex flex-col gap-2",
    desktopCollapsed ? "ml-0 border-l-0 pl-0" : "ml-3 border-l border-[#647FBC]/20 pl-3",
  ].join(" ");

  useEffect(() => {
    const storedValue = window.localStorage.getItem(DESKTOP_SIDEBAR_STORAGE_KEY);
    if (storedValue === "true") {
      setDesktopCollapsed(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      DESKTOP_SIDEBAR_STORAGE_KEY,
      String(desktopCollapsed)
    );
  }, [desktopCollapsed]);

  const navContent = (
    <nav className="flex flex-col p-4 space-y-2 mt-4">
        <Link
          href="/dashboard/customer"
          onClick={() => setMobileOpen(false)}
          className={withDesktopState(
            isDashboardActive ? activeTabClass : inactiveTabClass
          )}
          title="Dashboard"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span className={labelClass}>Dashboard</span>
        </Link>
        <div className={subNavClass}>
          <Link
            href="/dashboard/customer"
            onClick={() => setMobileOpen(false)}
            className={withDesktopState(
              isCustomerActive ? subActiveTabClass : subInactiveTabClass
            )}
            title="Customer Frontend Dashboard"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className={labelClass}>Customer Frontend Dashboard</span>
          </Link>
          <Link
            href="/dashboard/admin"
            onClick={() => setMobileOpen(false)}
            className={withDesktopState(
              isAdminActive ? subActiveTabClass : subInactiveTabClass
            )}
            title="Admin Frontend Dashboard"
          >
            <Shield className="h-4 w-4" />
            <span className={labelClass}>Admin Frontend Dashboard</span>
          </Link>
        </div>
        <Link
          href="/projects"
          onClick={() => setMobileOpen(false)}
          className={withDesktopState(
            isProjectsActive ? activeTabClass : inactiveTabClass
          )}
          title="Projects"
        >
          <FolderKanban className="h-4 w-4" />
          <span className={labelClass}>Projects</span>
        </Link>
      </nav>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-20 z-[70] rounded-xl border border-[#647FBC]/20 bg-white/90 p-3 text-[#647FBC] shadow-sm md:hidden"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>
      {mobileOpen && (
        <div className="fixed inset-0 z-[80] bg-black/30 md:hidden">
          <aside className="h-full w-[82vw] max-w-72 bg-[#FAFDD6] shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-200/60 px-4 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#647FBC]/70">
                Navigation
              </p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-[#647FBC]/20 bg-white p-2 text-[#647FBC]"
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {navContent}
          </aside>
        </div>
      )}
      <aside
        className={[
          "hidden flex-shrink-0 border-r border-gray-200/60 bg-white/60 backdrop-blur-sm transition-all duration-200 md:block",
          desktopCollapsed ? "w-20" : "w-64",
        ].join(" ")}
      >
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            type="button"
            onClick={() => setDesktopCollapsed((value) => !value)}
            className="rounded-lg border border-[#647FBC]/20 bg-white p-2 text-[#647FBC]"
            aria-label={desktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {desktopCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>
        {navContent}
      </aside>
    </>
  );
}
