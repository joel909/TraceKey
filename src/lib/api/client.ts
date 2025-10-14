//This function is used to call all the types of api calls to the backend 
// src/lib/api/client.ts

// src/lib/api/client.ts

/**
 * Simple API Client for Cookie-Based Auth
 * Cookies are automatically sent by the browser!
 */
export class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  }

  /**
   * GET request
   */
  //Not used anywhere yet but might be useful in future
  async get(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✨ This sends cookies automatically!
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * POST request
   */
  //frequiently used in the project
  async post(endpoint: string, data: any) {
    //TODO Add you centralized error handling here
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✨ This sends cookies automatically!
      body: JSON.stringify(data),
    });


    return response.json();
  }

  /**
   * PUT request
   */
  async put(endpoint: string, data: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✨ This sends cookies automatically!
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * DELETE request
   */
  async delete(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // ✨ This sends cookies automatically!
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || `HTTP Error: ${response.status}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const apiClient = new ApiClient();