import { CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';
export default function ProjectCardHeader() {
    return (
        <CardHeader>
            <CardTitle className="text-[#647FBC] flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Project Details
            </CardTitle>
        </CardHeader>
    )
}