import { Button } from "@/components/ui/button";
import {FolderKanban} from "lucide-react";
export default function NewProjectButton() {
    return (
        <Button className="bg-[#647FBC] hover:bg-[#5a6fb0] cursor-pointer text-white font-medium">
            <FolderKanban className="mr-2 h-4 w-4" />
            New Project
        </Button>
    );
}