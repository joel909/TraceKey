export  interface Project {
    id: string;
    name: string;
    description: string;
    site_link: string;
    visits: string;
    users: string;
}
export interface CreateUserProjectResponse {
    // Fields from createProject query
    project_id: string;
    created_by: string;
    project_name: string;
    api_key: string;
    created_at: Date;
    description: string;
    site_url: string;
    
    // Fields from AddUserToProjectQuery
    uuid: string;
    timestamp: Date;
}

export interface SingleProjectDetails {
    id : string,
    project_name : string,
    api_key: string;
    description: string;
    site_url: string;
}