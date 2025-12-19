'use client'

import { useState } from "react"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectData } from "@/lib/interfaces/manage_project_interfaces"
import { ProjectSettingsModal } from "@/components/modals/ProjectSettingsModal"

export default function ManageProjectHeading({ project }: { project: ProjectData }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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
            <ProjectSettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                project={project}
                sharedUsers={[
                    { id: '1', name: 'john@example.com' }
                ]}
                onAddUser={async (email) => {
                    console.log('Adding user:', email);
                    return [
                        { id: '1', name: 'john@example.com' },
                        { id: '2', name: email }
                    ];
                }}
                onRevokeAccess={async (userId) => {
                    console.log('Revoking access for user:', userId);
                    return [
                        { id: '1', name: 'john@example.com' }
                    ].filter(u => u.id !== userId);
                }}
            />
        </>
    )
}