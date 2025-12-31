'use client'

import { LogActivity } from "@/lib/interfaces/deviceInfoInterface"
import { DashboardData } from "@/lib/interfaces/manage_project_interfaces"
import OverviewTabContainer from "./OverviewTabContainer"

export default function ProjectsOverviewWrapper({ project_data,isDashboard } : { project_data: DashboardData, isDashboard: boolean }) {
    const handleFetchLogs = async (page: number): Promise<LogActivity[]> => {
      if (!isDashboard) {
        const response = await fetch(
          `/api/v1/get/project/logs?id=${project_data.recentActivity}&&page=${page}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch logs")
        }
        const data = await response.json()
        return data.logs || []
      }else{
        const response = await fetch(
          `/api/v1/get/user/dashboard/logs?page=${page}`
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