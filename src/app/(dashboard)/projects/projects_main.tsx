import NewProjectButton from "@/components/buttons/NewProjectButton";
import ProjectsCard from "@/components/cards/project-card/CardContainer";
import { fetchUserAssociatedProjectsService } from "@/lib/controllers/account.controller";
import  Project  from "@/lib/interfaces/project_interface";

// --- Mock Project Data ---
// const projects = [
//   {
//     id: "1",
//     name: "E-Commerce Store",
//     site_link: "https://mystore.com",
//     description: "Online shopping platform",
//     visits: "2,341",
//     users: "1,204"
//   },
//   {
//     id: "2",
//     name: "Blog Website",
//     site_link: "https://myblog.com", 
//     description: "Personal tech blog",
//     visits: "8,932",
//     users: "3,567"
//   },
//   {
//     id: "3",
//     name: "Portfolio Site",
//     site_link: "https://myportfolio.dev",
//     description: "Developer showcase",
//     visits: "1,234",
//     users: "892"
//   },
//   {
//     id: "4",
//     name: "SaaS Dashboard",
//     site_link: "https://saas.example.com",
//     description: "Analytics platform",
//     visits: "15,678",
//     users: "4,321"
//   }
// ];

// --- Main Projects Page ---
export default async function ProjectsPage({projects,uuid}: {projects :Project[], uuid: string}) {
    const projects_2 = await fetchUserAssociatedProjectsService(uuid);
    console.log("Rendering Projects Page with projects:", projects_2);

    return (
        <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-[#647FBC]">
                    Projects
                </h2>
                <NewProjectButton />
            </div>

            {/* --- Projects Grid --- */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
                <ProjectsCard key={project.id} project={project} />
            ))}
            </div>
        </main>
    );
}
