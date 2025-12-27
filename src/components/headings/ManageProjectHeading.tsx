'use client'

import { useState, useEffect } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectData } from "@/lib/interfaces/manage_project_interfaces"
import { ProjectSettingsModal } from "@/components/modals/ProjectSettingsModal"
import { UserRequest } from "@/lib/user-requests/UserRequest"

interface SharedUser {
    id: string;
    name: string;
}

export default function ManageProjectHeading({ project }: { project: ProjectData }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [sharedUsers, setSharedUsers] = useState<SharedUser[]>([])
    const [isLoadingUsers, setIsLoadingUsers] = useState(false)

    useEffect(() => {
        if (isSettingsOpen) {
            fetchProjectUsers()
        }
    }, [isSettingsOpen])

    const fetchProjectUsers = async () => {
        setIsLoadingUsers(true)
        try {
            // Simulate API call with 2 second delay
            await new Promise(resolve => setTimeout(resolve, 2000))
            
            const userRequest = new UserRequest()
            const users = await userRequest.getProjectUsers(project.id)
            setSharedUsers(users)
        } catch (error) {
            console.error('Error fetching project users:', error)
            setSharedUsers([])
        } finally {
            setIsLoadingUsers(false)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-[#647FBC] mb-2">{project.name}</h2>
                    <p className="text-[#647FBC]/70 mb-4">{project.description}</p>
                </div>
                <Button
                    onClick={() => setIsSettingsOpen(true)}
                    className="bg-[#647FBC] hover:bg-[#5a6fb0] text-white"
                >
                    <Settings className="mr-2 h-4 w-4" />
                    Project Settings
                </Button>
            </div>
            {/* Find shared users when project is opened + remove access when project is closed */}
            <ProjectSettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                project={project}
                sharedUsers={sharedUsers}
                isLoadingUsers={isLoadingUsers}
                onAddUser={async (email) => {
                    try {
                        const userRequest = new UserRequest();
                        // Simulate API call with 2 second delay
                        await new Promise(resolve => setTimeout(resolve, 2000))
                        await userRequest.addUserToProject(project.id, email);
                        console.log('Adding user:', email);
                        // Refresh users list
                        await fetchProjectUsers()
                        return sharedUsers;
                    } catch (error) {
                        console.error('Error in onAddUser:', error);
                        throw error instanceof Error ? error : new Error('Failed to add user');
                    }
                }}
                onRevokeAccess={async (userId) => {
                    try {
                        // Simulate API call with 2 second delay
                        await new Promise(resolve => setTimeout(resolve, 2000))
                        console.log('Revoking access for user:', userId);
                        // Refresh users list after revoke
                        await fetchProjectUsers()
                        return sharedUsers.filter(u => u.id !== userId);
                    } catch (error) {
                        console.error('Error revoking access:', error)
                        throw error instanceof Error ? error : new Error('Failed to revoke access')
                    }
                }}
            />
        </>
    )
}