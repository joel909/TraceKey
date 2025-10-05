"use client"
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";
import { UserProjectCardContainerProps } from "./project_interface";
    
export default function UserProjectCardContent({ project }: UserProjectCardContainerProps) {
    const onclick =() => {
        window.location.href = `projects/manage/${project.id}`;
    }
    return(
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
            className="w-full cursor-pointer bg-[#647FBC] hover:bg-[#5a6fb0] text-white font-medium"
            onClick={onclick}
            >
                <BarChart3 className="mr-2 h-4 w-4" />
                Manage Project
            </Button>
      </CardContent>
    )
    
    
}