// src/lib/user/request.ts

import { apiClient } from '@/lib/user-requests/api/client';
import {UserCreationRequestInterface} from '@/lib/interfaces/UserInterfaces';
import { ValidationError } from '../errors/extended_errors/ValidationError';


export class AuthRequest {
    async createUser(data : UserCreationRequestInterface) {
        // let result;
        try{
            const result = await apiClient.post('/create-account', data);
        if (!result.ok && result.field && result.message) {
            // console.log("Error from @@@@@@@@@@@@@@@@@@@@server:", result.message);
            throw new ValidationError(result.message,result.field); // Fixed to use response
        }else if(!result.ok && result.message) {
            // console.log("Error from server:", result.message);
            throw new Error(`API Error: ${result.status} ${result.message}`); // Fixed to use response
        }
        // console.log("Result from server:", result);
        return result;
    } catch(error) {
        // console.error("Error occurred while creating user:", result);
        throw error;
    }


}
}

export const authRequests = new AuthRequest();