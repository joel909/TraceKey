'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {FolderKanban} from "lucide-react";
import { CreateProjectModal } from "@/components/modals/CreateProjectModal";
import { UserRequest } from '@/lib/user-requests/UserRequest';

export default function NewProjectButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateProject = async (projectData: { name: string; description: string }) => {
        try {
            // Dummy API call with timeout
            const userRequests = new UserRequest()
            await userRequests.createNewProject(projectData.name,projectData.description);
            // Optionally reload the page or update state
            window.location.reload();
        } catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    };

    return (
        <>
            <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#647FBC] hover:bg-[#5a6fb0] cursor-pointer text-white font-medium"
            >
                <FolderKanban className="mr-2 h-4 w-4" />
                New Project
            </Button>

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateProject={handleCreateProject}
            />
        </>
    );
}