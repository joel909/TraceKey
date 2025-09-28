import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import { UserProjectCardContainerProps } from "./project_interface"
export default function UserProjectCardHeader({ project }: UserProjectCardContainerProps) {
    return (
        <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-[#647FBC] mb-1">
                        {project.name}
                    </CardTitle>
                    <p className="text-sm text-[#647FBC]/70 mb-2">{project.description}</p>
                    <div className="flex items-center gap-2 text-[#647FBC]/60">
                        <ExternalLink className="h-4 w-4" />
                            <a href={project.site_link} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#647FBC] hover:underline transition-colors">
                                {project.site_link}
                            </a>
                    </div>
                </div>
            </div>
        </CardHeader>
    )
}