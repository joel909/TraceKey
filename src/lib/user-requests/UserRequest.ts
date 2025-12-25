import { apiClient } from '@/lib/user-requests/api/client';
export class UserRequest {
    async addUserToProject(projectId: string, newUserEmail: string): Promise<void> {
        // Delegates the request to ProjectControlle
            const result = await apiClient.post('/project/add_user', {
                projectId,
                newUserEmail
            });
            if (!result.ok && result.message) {
                throw new Error(`Failed to add user: ${result.message}`);
            }
            return result;

    }
}
