import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {ProjectData} from "@/app/(dashboard)/projects/manage/manage_project_interfaces"
export default function ManageProjectHeading({project}: {project: ProjectData}) {
    return (
        <div className="flex items-center justify-between mb-4">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-[#647FBC] mb-2">{project.name}</h2>
                    <p className="text-[#647FBC]/70 mb-4">{project.description}</p>
            </div>
            <Button className="bg-[#647FBC] hover:bg-[#5a6fb0] text-white">
                <Settings className="mr-2 h-4 w-4" />
                Project Settings
            </Button>
        </div>
    )
}