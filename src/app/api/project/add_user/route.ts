import { cookies } from "next/headers";
import { AuthenticationError } from "@/lib/errors/extended_errors/AuthenticationError";
import { AuthorizationError } from "@/lib/errors/extended_errors/AuthorizationError";
import { ResourceNotFoundError } from "@/lib/errors/extended_errors/ResourceNotFoundError";
import { ValidationError } from "@/lib/errors/extended_errors/ValidationError";
import { projectController } from "@/lib/controllers/project.controller";
export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const auth_key = cookieStore.get("auth_key")?.value;
        const { projectId, newUserEmail } = await request.json();
        if (!projectId || !newUserEmail || !auth_key) {
            return new Response(JSON.stringify({ success: false, message: 'Missing required fields.' }), { status: 400 });
        }
        await projectController.addUserToProject(projectId, newUserEmail, auth_key);
        return new Response(JSON.stringify({ success: true, message: 'User added to project successfully.' }), { status: 200 });
    }
    catch (error) {
        if (error instanceof ResourceNotFoundError ||
            error instanceof ValidationError ||
            error instanceof AuthenticationError ||
            error instanceof AuthorizationError) {
            return new Response(JSON.stringify({ success: false, message: error.message }), { status: 400 });
        } else {
            console.error('Unexpected error in add_user route:', error);
            return new Response(JSON.stringify({ success: false, message: 'Internal server error.' }), { status: 500 });
        }
    }
}

/*
ALL THE TEST CASES BELOW ARE TO BE RUN IN THE FOLLOWING CONTEXT:

Pre-existing Data:
1. User A (Owner)
   - UUID: 2ffcf1fc-11ed-44d1-9cbf-b2d6952d5772
   - Auth Key: aoEDuuWic1qpKmaSLyi5BUzX9wNqsxGYvkWghn9RSn4
   - Email: owner@example.com
2. User B (Non-Owner)
   - UUID: a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6
   - Auth Key: zU9ECUEkO1-1-VQoUmLynuKOaf1OVGLsRNoub6n8dT0
   - Email: nonowner@example.com
# Test 1: Invalid API Key
curl -X POST http://localhost:3000/api/project/add_user -H "Content-Type: application/json" -d '{"uuid": "2ffcf1fc-11ed-44d1-9cbf-b2d6952d5772", "projectId": "ae4fcb77-beaf-4544-aba5-39f75d4ec490", "newUserEmail": "frn@jrnwi.ewnf", "auth_key": "invalid-auth-key-xyz123"}'

# Test 2: User NOT Owner
curl -X POST http://localhost:3000/api/project/add_user -H "Content-Type: application/json" -d '{"uuid": "a1b2c3d4-e5f6-47a8-b9c0-d1e2f3a4b5c6", "projectId": "ae4fcb77-beaf-4544-aba5-39f75d4ec490", "newUserEmail": "frn@jrnwi.ewnf", "auth_key": "zU9ECUEkO1-1-VQoUmLynuKOaf1OVGLsRNoub6n8dT0"}'

# Test 3: Email Does NOT Exist (User IS Owner)
curl -X POST http://localhost:3000/api/project/add_user -H "Content-Type: application/json" -d '{"uuid": "2ffcf1fc-11ed-44d1-9cbf-b2d6952d5772", "projectId": "ae4fcb77-beaf-4544-aba5-39f75d4ec490", "newUserEmail": "nonexistent@fake.email", "auth_key": "aoEDuuWic1qpKmaSLyi5BUzX9wNqsxGYvkWghn9RSn4"}'

# Test 4: User Already in Project
curl -X POST http://localhost:3000/api/project/add_user -H "Content-Type: application/json" -d '{"uuid": "2ffcf1fc-11ed-44d1-9cbf-b2d6952d5772", "projectId": "ae4fcb77-beaf-4544-aba5-39f75d4ec490", "newUserEmail": "frn@jrnwi.ewnf", "auth_key": "aoEDuuWic1qpKmaSLyi5BUzX9wNqsxGYvkWghn9RSn4"}'
*/