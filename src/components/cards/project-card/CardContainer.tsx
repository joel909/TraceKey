'use client';
import { Card} from "@/components/ui/card";
import { UserProjectCardContainerProps } from "../../../lib/interfaces/project_card_interface";
import UserProjectCardContent from "./CardContent";
import UserProjectCardHeader from "./CardHeader";
export default function ProjectsCard({ project }: UserProjectCardContainerProps){
    return(
    <Card className="shadow-sm border border-gray-200/60 bg-white/70 backdrop-blur-sm hover:bg-white/80 transition-all duration-300">
        <UserProjectCardHeader project={project}/>
        <UserProjectCardContent project={project}/>
        
    </Card>
    )
}