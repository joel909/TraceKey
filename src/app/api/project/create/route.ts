import { cookies } from "next/headers";
import {authController} from '@/lib/controllers/auth.controller';
import {projectController} from '@/lib/controllers/project.controller';
import gen_auth_key from "@/lib/utils/auth_key";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { AuthorizationError } from "@/lib/errors/extended_errors/AuthorizationError";

export async function POST(request: Request) {
    try{
        const { name, description } = await request.json();
        const cookie = await cookies()
        const auth_key = cookie.get('auth_key')?.value;
        if (!auth_key || !name || !description) {
            return new Response(JSON.stringify({ message: 'Missing required fields.' }), { status: 400 });
        }
        const userData = await authController.verifyAuthKey(auth_key);
        const projectApiKey = gen_auth_key();
        const createProjectResponse = await projectController.createProject(userData.uuid, name, projectApiKey, "default_password", description, `https://tracekey.joeljoby.com/project/sample/${projectApiKey}`);
        return new Response(JSON.stringify({ message: 'Project created successfully.', project: createProjectResponse }), { status: 201 });
    }
    catch (error) {
        if (error instanceof AuthorizationError){
            return new Response(JSON.stringify({ message: error.message }), { status: 401 });
        }
        if(error instanceof AuthenticationError){
            return new Response(JSON.stringify({ message: error.message }), { status: 403 });
        }
        console.error('Unexpected error in create project route:', error);
        return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
    }
}