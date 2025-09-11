"use client"
import NavBar from "@/components/navbars/dashboard_navbar";
import SidebarNavBar from "@/components/navbars/sidebar_navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {

  FolderKanban,

  ExternalLink,
  BarChart3,
} from "lucide-react";

// --- Mock Project Data ---
const projects = [
  {
    id: 1,
    name: "E-Commerce Store",
    site_link: "https://mystore.com",
    description: "Online shopping platform",
    visits: "2,341",
    users: "1,204"
  },
  {
    id: 2,
    name: "Blog Website",
    site_link: "https://myblog.com", 
    description: "Personal tech blog",
    visits: "8,932",
    users: "3,567"
  },
  {
    id: 3,
    name: "Portfolio Site",
    site_link: "https://myportfolio.dev",
    description: "Developer showcase",
    visits: "1,234",
    users: "892"
  },
  {
    id: 4,
    name: "SaaS Dashboard",
    site_link: "https://saas.example.com",
    description: "Analytics platform",
    visits: "15,678",
    users: "4,321"
  }
];

// --- Project Card Component ---
function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <Card className="shadow-sm border border-gray-200/60 bg-white/70 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-[#647FBC] mb-1">
              {project.name}
            </CardTitle>
            <p className="text-sm text-[#647FBC]/70 mb-2">{project.description}</p>
            <div className="flex items-center gap-2 text-[#647FBC]/60">
              <ExternalLink className="h-4 w-4" />
              <a 
                href={project.site_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm hover:text-[#647FBC] hover:underline transition-colors"
              >
                {project.site_link}
              </a>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-lg font-bold text-[#647FBC]">{project.visits}</div>
              <div className="text-xs text-[#647FBC]/70">Visits</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#647FBC]">{project.users}</div>
              <div className="text-xs text-[#647FBC]/70">Users</div>
            </div>
          </div>
        </div>
        <Button 
          className="w-full bg-[#647FBC] hover:bg-[#5a6fb0] text-white font-medium"
          onClick={() => console.log(`Managing project ${project.id}`)}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Manage
        </Button>
      </CardContent>
    </Card>
  );
}

// --- Main Projects Page ---
export default function ProjectsPage() {
  const userName = "Alex Doe";

  return (
    <div className="flex min-h-screen w-full flex-col" style={{ backgroundColor: '#FAFDD6' }}>
      {/* ===== Header Bar (Same as Dashboard) ===== */}
      <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b border-gray-300/50 bg-white/40 backdrop-blur-md px-6 z-50 shadow-sm">
        <h1 className="text-2xl font-bold text-[#647FBC]">TraceKey</h1>
        <NavBar userName={userName} userEmail="joeljobyp@gmail.com" />

      </header>

      <div className="flex flex-1">
        {/* ===== Sidebar Navigation ===== */}
        <SidebarNavBar active_tab="projects" />

        {/* ===== Main Content Area ===== */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-tight text-[#647FBC]">
              Projects
            </h2>
            <Button className="bg-[#647FBC] hover:bg-[#5a6fb0] text-white font-medium">
              <FolderKanban className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          {/* --- Projects Grid --- */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
