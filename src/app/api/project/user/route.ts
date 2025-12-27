import { projectController } from "@/lib/controllers/project.controller";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const auth_key = cookieStore.get("auth_key")?.value;
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    if (!projectId) {
        return new Response(JSON.stringify({ message: 'Project ID is required' }), { status: 400 });
    }
    try {
        const emails = await projectController.getUsersAttachedToProject(projectId, auth_key || '');
        return new Response(JSON.stringify({ emails }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ message: error.message || 'Internal Server Error' }), { status: 500 });
    }
}
/*
# Test 1: Project ID with first auth key
curl -b "auth_key=aoEDuuWic1qpKmaSLyi5BUzX9wNqsxGYvkWghn9RSn4" \
  "http://localhost:3000/api/project/user?projectId=7452a45a-416b-4e3e-a9c7-6eb67e290a93"

# Test 2: Same project ID with different auth key
curl -b "auth_key=NCRZGf6lOOqXh65EUFn5BihdfvHXj5nQTlkEysXzjws" \
  "http://localhost:3000/api/project/user?projectId=7452a45a-416b-4e3e-a9c7-6eb67e290a93"

# Test 3: Different project ID with random auth key
curl -b "auth_key=randomAuthKeyExampleForTesting123456789" \
  "http://localhost:3000/api/project/user?projectId=5f80bbb0-2b5b-4078-97b7-53539e32c2fb"

# Test 4: First project ID with invalid auth key format
curl -b "auth_key=7452a45a-416b-4e3e-a9c7-6eb67e290a91" \
  "http://localhost:3000/api/project/user?projectId=7452a45a-416b-4e3e-a9c7-6eb67e290a93"

# Test 5: Missing projectId (should return 400 error)
curl -b "auth_key=aoEDuuWic1qpKmaSLyi5BUzX9wNqsxGYvkWghn9RSn4" \
  "http://localhost:3000/api/project/user"
  # Final test case with the auth key
curl -b "auth_key=zU9ECUEkO1-1-VQoUmLynuKOaf1OVGLsRNoub6n8dT0" \
  "http://localhost:3000/api/project/user?projectId=7452a45a-416b-4e3e-a9c7-6eb67e290a93"
*/