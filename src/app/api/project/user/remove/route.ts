import { cookies } from "next/headers";
import { projectController } from "@/lib/controllers/project.controller";
import { ResourceNotFoundError } from "@/lib/errors/extended_errors/ResourceNotFoundError";
import { AuthorizationError } from "@/lib/errors/extended_errors/AuthorizationError";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";
export async function DELETE(request: Request) {
    try{
        const cookieStore = await cookies();
        const auth_key = cookieStore.get("auth_key")?.value;
        const { projectId, removeUserEmail } = await request.json();
        if (!projectId || !removeUserEmail || !auth_key) {
            return new Response(JSON.stringify({ message: 'Missing required fields.' }), { status: 400 });
        }
        //call the controller method to remove user from project
        await projectController.removeUserFromProject(projectId, removeUserEmail, auth_key);
        return new Response(JSON.stringify({ message: 'User removed from project successfully.' }), { status: 200 });
    }catch (error) {
        if(error instanceof AuthenticationError){
            return new Response(JSON.stringify({ message: error.message }), { status: 403 });
        }
        if (error instanceof ResourceNotFoundError){
            return new Response(JSON.stringify({ message: error.message }), { status: 404 });
        }
        if (error instanceof AuthorizationError){
            return new Response(JSON.stringify({ message: error.message }), { status: 401 });
        }
        if (error instanceof ValidationError){
            return new Response(JSON.stringify({ message: error.message }), { status: 400 });
        }
        
        console.error('Unexpected error in remove_user route:', error);
        return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
    }
    //the flow should be check the auth key from headers and verify and then deocode the info
    //get the project id and user id to be removed from the body
    //check if user owns the project if yes then let him do
    // also check if the person being remove is not the owner
    //check if user already exists in the project 
    //remove the dude from the project
    
}