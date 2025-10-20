import NewProjectButton from "@/components/buttons/NewProjectButton";
import ProjectsCard from "@/components/cards/project-card/CardContainer";
import  {Project}  from "@/lib/interfaces/project_interface";

export default async function ProjectsPage({projects = []}: {projects :Project[]}) {
    console.log("Rendering Projects Page with projects:", projects);
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
