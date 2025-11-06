'use client'

import { LogActivity } from "@/lib/interfaces/deviceInfoInterface"
import { ProjectData } from "@/lib/interfaces/manage_project_interfaces"
import OverviewTabContainer from "./OverviewTabContainer"

export default function ProjectsOverviewWrapper({ project_data } : { project_data: ProjectData}) {
    const handleFetchLogs = async (page: number): Promise<LogActivity[]> => {
        const response = await fetch(
          `/api/v1/get/project/logs?id=${project_data.id}&&page=${page}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch logs")
        }
        const data = await response.json()
        return data.logs || []
      }
      return (
        <OverviewTabContainer data={project_data} onFetchPage={handleFetchLogs} />
      )
}