import { projectController } from "@/lib/controllers/project.controller";
import { getDurationInterval } from "@/lib/utils/client/durationMaps";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const cookie = await cookies();
    const auth_key = cookie.get("auth_key")?.value;
    const url = new URL(request.url);
    const pageNumber = url.searchParams.get("page");
    const duration = getDurationInterval(url.searchParams.get("duration"));
    if (!auth_key) {
        return new Response(JSON.stringify({ message: 'Authentication key is missing.' }), { status: 403 });
    }
    try{
        const [logData,logStatics,topRegion] = await projectController.fetchAllUsersProjectLogs(auth_key,pageNumber ? parseInt(pageNumber) : 1,duration);
        return new Response(JSON.stringify({ logs: logData, logStatics: logStatics, topRegion: topRegion }), { status: 200 });
    }catch( error ){
        console.error('Error fetching user dashboard logs:', error);
        return new Response(JSON.stringify({ message: 'internal server error' }), { status: 400 });
    }
}
