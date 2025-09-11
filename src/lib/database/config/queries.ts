export const createUserQuery = `
    INSERT INTO users (email, name, password, auth_key)
    VALUES ($1, $2, $3, $4)
    RETURNING uuid, email, name, auth_key;
`;
export const createProjectQuery = `
    INSERT INTO projects (created_by, project_name, api_key, created_at, description, site_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, created_by, project_name, api_key, created_at, description, site_url;
`;

export const fetchUserByEmailQuery = `
    SELECT uuid,name,email FROM users WHERE auth_key = $1;    
    `
export const createProject = `
    INSERT INTO projects (created_by, project_name, api_key, created_at, password, description, site_url)
    VALUES ($1, $2, $3, NOW(),$4, $5, $6)
    RETURNING project_id, created_by, project_name, api_key, created_at, description, site_url;
`
export const AddUserToProjectQuery = `
    INSERT INTO user_projects(project_id, uuid, timestamp)
    VALUES ($1, $2, NOW())
    RETURNING project_id, uuid, timestamp;   
`;

// export const fetchUserAssociatedProjects = `
//  SELECT '
