import { apiClient } from '@/lib/user-requests/api/client';

interface SharedUser {
    id: string;
    name: string;
}

export class UserRequest {
    async addUserToProject(projectId: string, newUserEmail: string): Promise<void> {
        // Delegates the request to ProjectControlle
        const result = await apiClient.post('/project/user/add', {
            projectId,
            newUserEmail
        });
        return result;
        }
    async removeUserFromProject(projectId: string, removeUserEmail: string): Promise<void> {
        // Delegates the request to ProjectController
        const result = await apiClient.delete('/project/user/remove', {
            projectId,
            removeUserEmail
        });
        return result;
        }

    async getProjectUsers(projectId: string): Promise<SharedUser[]> {
        // Fetch users attached to a project
        const result = await apiClient.get(`/project/user?projectId=${projectId}`);
        if (result?.emails && Array.isArray(result.emails)) {
            return result.emails.map((email: string, index: number) => ({
                id: `user-${index}-${email}`,
                name: email
            }));
        }
        return [];
    }
    async modifyProjectData(projectId: string, name: string, description:string,deployed_url: string): Promise<void> {
        // Delegates the request to ProjectController
        const result = await apiClient.put('/project/update', {
            projectId,
            name,
            description,
            deployed_url
        });
        return result;
        }
    async createNewProject(name:string,description:string) {
        const result = await apiClient.post('/project/create', {
            name,
            description
        })
        return result;
        
    }
}

