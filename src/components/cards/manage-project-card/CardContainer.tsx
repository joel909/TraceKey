'use client'
import ProjectCardHeader from "./CardHeader"
import ManageProjectContent from "./CardContent"
import { Card } from "@/components/ui/card";
import { ProjectData } from "@/app/manage/manage_project_interfaces";
export default function ProjectCardContent({ project }: { project: ProjectData }) {
    return (
        <Card className="bg-white/70 backdrop-blur-sm border-gray-200/60">
            <ProjectCardHeader />
            <ManageProjectContent project={project} />
        </Card>
    )
}