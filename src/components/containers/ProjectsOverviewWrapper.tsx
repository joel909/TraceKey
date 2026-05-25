'use client'

import { LogActivity } from "@/lib/interfaces/deviceInfoInterface"
import { ProjectData } from "@/lib/interfaces/manage_project_interfaces"
import OverviewTabContainer from "./OverviewTabContainer"
import { useSearchParams } from "next/navigation"
import { DEFAULT_DURATION_KEY, normalizeDurationKey } from "@/lib/utils/client/durationMaps"

export default function ProjectsOverviewWrapper({ project_data,isDashboard } : { project_data: ProjectData, isDashboard: boolean }) {
    const searchParams = useSearchParams();
    const duration = normalizeDurationKey(searchParams.get("duration") ?? DEFAULT_DURATION_KEY);

    const handleFetchLogs = async (page: number): Promise<LogActivity[]> => {
      
      if (!isDashboard) {

        const response = await fetch(
          `/api/v1/get/project/logs?id=${project_data.id}&page=${page}&duration=${duration}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch logs")
        }
        const data = await response.json()
        return data.logs || []
      }else{
        const response = await fetch(
          `/api/v1/get/user/dashboard/logs?page=${page}&duration=${duration}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch logs")
        }
        const data = await response.json()
        return data.logs || []
        
      }
    
    }
      return (
        <OverviewTabContainer data={project_data} onFetchPage={handleFetchLogs} />
      )
}
