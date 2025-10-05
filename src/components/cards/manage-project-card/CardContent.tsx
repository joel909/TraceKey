'use client'
import { ProjectData } from "@/app/(dashboard)/projects/manage/manage_project_interfaces";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Copy, ExternalLink, Settings } from "lucide-react";
import { toast } from "sonner";

export default function ManageProjectContent({ project }: { project: ProjectData }) {
    const copyToClipboard = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`${label} copied to clipboard!`);
    };

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
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(project.url, "URL")}
                            className="border-[#647FBC]/20 text-[#647FBC] hover:bg-[#647FBC]/10"
                            aria-label="Copy URL"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(project.url, "_blank")}
                            className="border-[#647FBC]/20 text-[#647FBC] hover:bg-[#647FBC]/10"
                            aria-label="Open URL"
                        >
                            <ExternalLink className="h-4 w-4" />
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
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(project.apiKey, "API Key")}
                            className="border-[#647FBC]/20 text-[#647FBC] hover:bg-[#647FBC]/10"
                            aria-label="Copy API Key"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
            {/* Setup Button Section */}
            <div className="flex justify-end pt-4">
                <Button className="bg-[#647FBC] hover:bg-[#5a6fb0] text-white flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Setup with API Key
                </Button>
            </div>
        </CardContent>
    );
}