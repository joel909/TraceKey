import { AuthenticationError } from "@/lib/errors/AuthenticationError";

export default async function requestUserData(auth_key : string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const request = await fetch(`${baseUrl}/api/internal/fetchUser?auth_key=${auth_key}`);
    if(request.status == 422) {
        throw new AuthenticationError('Failed to fetch user data');
    }
    else if(request.status == 500) {
        throw new Error('An unexpected error occurred.');
    }
    else if(request.ok) {
        const user = await request.json();
        return user.data;
    }

    return null;
}
