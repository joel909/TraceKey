import { projectController } from "@/lib/controllers/project.controller";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { AuthorizationError } from "@/lib/errors/extended_errors/AuthorizationError";
import { ResourceNotFoundError } from "@/lib/errors/extended_errors/ResourceNotFoundError";
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";
import { cookies } from "next/headers";

export async function PUT(request: Request) {
    try{
        const cookieStore = await cookies();
        const auth_key = cookieStore.get("auth_key")?.value;
        const { projectId, name, description, deployed_url } = await request.json();
        if (!projectId || !name || !description || !deployed_url || !auth_key) {
            return new Response(JSON.stringify({ message: 'Missing required fields.' }), { status: 400 });
        }
        //call the controller method to update project details
        await projectController.modifyProjectData(projectId, name, description, deployed_url, auth_key);
        return new Response(JSON.stringify({ message: 'Project details updated successfully.' }), { status: 200 });
    }catch (error) {
        if(error instanceof AuthenticationError){
            return new Response(JSON.stringify({ message: error.message }), { status: 403 });
        }
        if (error instanceof ResourceNotFoundError){
            return new Response(JSON.stringify({ message: error.message }), { status:404 });     
        }
        if (error instanceof AuthorizationError){
            return new Response(JSON.stringify({ message: error.message }), { status: 401 });
        }
        if (error instanceof ValidationError){
            return new Response(JSON.stringify({ message: error.message }), { status: 400 });
        }
        
        console.error('Unexpected error in update project route:', error);
        return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
    }
}