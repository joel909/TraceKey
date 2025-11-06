import { authController } from "@/lib/controllers/auth.controller";
import { projectController } from "@/lib/controllers/project.controller";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { AuthorizationError } from "@/lib/errors/extended_errors/AuthorizationError";
import { cookies } from "next/headers";
export async function GET(req: Request) {
    const url = new URL(req.url);
    const cookiesStore = await cookies();
    const auth_key = cookiesStore.get('auth_key')?.value;
    const project_uuid = url.searchParams.get('id');
    const page = url.searchParams.get('page');
    // 1. Check if params exist
    if (!auth_key || !project_uuid || !page) {
        return new Response(JSON.stringify({ error: "Missing required parameters" }), { status: 400 });
    }
    // 4. Validate page is a valid number
    const pageNumber = parseInt(page, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
        return new Response(JSON.stringify({ error: "Page must be a positive number" }), { status: 400 });
    }
    // 5. Now pass validated data to query
    try{
        const userData =  await authController.verifyAuthKey(auth_key);
        const uuid = userData.uuid;
        await authController.verifyUserProjectAccess(uuid, project_uuid);
        const projectLogs = await projectController.getProjectIpLogs(project_uuid, pageNumber);
        return new Response(JSON.stringify({ logs: projectLogs }), { status: 200 });
    } catch (error) {
        console.error("Error fetching project logs:", error);
        if (error instanceof AuthenticationError) {
            return new Response(JSON.stringify({ error: error.message }), { status: 401 });
        }
        else if (error instanceof AuthorizationError) {
            return new Response(JSON.stringify({ error: error.message }), { status: 403 });
        }
        else{
            return new Response(JSON.stringify({ error: "Something went wrong please check params" }), { status: 403 });
        }
    }
    
    // Use pageNumber (the parsed integer), not the string 'page'
}