'use client'
import { ProjectData } from "@/app/(dashboard)/projects/manage/manage_project_interfaces";
import CopyButton from "@/components/buttons/CopyButton";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {  ExternalLink, Settings } from "lucide-react";
import { useState } from 'react';
import { ApiSetupModal } from '@/components/modals/SetupProjectApiKeyModal';

export default function ManageProjectContent({ project }: { project: ProjectData }) {
    const [isApiModalOpen, setIsApiModalOpen] = useState(false);

    return (
        <CardContent className="space-y-6">
            {/* Deployed URL & API Key Section */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Deployed URL */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#647FBC]/70">Deployed URL</label>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 p-2 bg-gray-50 rounded-md text-sm text-[#647FBC] truncate">
                            {project.url}
                        </div>
                        <CopyButton textToCopy={project.url} label="URL" />
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.url, "_blank")}
                            className="border-[#647FBC]/20 cursor-pointer text-[#647FBC] hover:bg-[#647FBC]/10"
                            aria-label="Open URL"
                        >
                            <ExternalLink className="h-4 w-4 cursor-pointer" />
                        </Button>
                    </div>
                </div>
                {/* API Key */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-[#647FBC]/70">API Key</label>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 p-2 bg-gray-50 rounded-md text-sm text-[#647FBC] font-mono">
                            {project.apiKey.substring(0, 20)}...
                        </div>
                        <CopyButton textToCopy={project.apiKey} label="API Key" />
                    </div>
                </div>
            </div>
            {/* Setup Button Section */}
            <div className="flex justify-end pt-4">
                <Button onClick={() => setIsApiModalOpen(true)} className="bg-[#647FBC] hover:bg-[#5a6fb0] text-white">
                    <Settings className="mr-2 h-4 w-4" />
                    Setup with API Key
                </Button>
            </div>
             <ApiSetupModal
                isOpen={isApiModalOpen}
                onClose={() => setIsApiModalOpen(false)}
                apiKey={project?.apiKey || ''}
                projectUrl={project?.url || ''}
            />
        </CardContent>
    );
}