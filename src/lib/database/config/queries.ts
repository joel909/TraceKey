
//query to create new user 
export const createUserQuery = `
    INSERT INTO users (email, name, password, auth_key)
    VALUES ($1, $2, $3, $4)
    RETURNING uuid, email, name, auth_key;
`;
//query to create a new project
export const createProjectQuery = `
    INSERT INTO projects (created_by, project_name, api_key, created_at, description, site_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id, created_by, project_name, api_key, created_at, description, site_url;
`;
//query to fetch users details from db on the basis of auth key
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
export const fetchUserAssociatedProjects = 
`
    SELECT user_projects.uuid,user_projects.project_id,projects.project_name,projects.description,projects.site_url FROM user_projects,projects WHERE user_projects.project_id = projects.project_id AND uuid = $1
`
export const fetchSingleProjectDataByIDQuery = 
`
SELECT project_name,api_key,description,site_url FROM projects WHERE project_id = $1
`

export const verifyUserProjectAccessQuery =
`
    SELECT * FROM user_projects WHERE uuid = $1 AND project_id = $2
`;

export const fetchProjectIDByAPIKeyQuery =
`
    SELECT project_id FROM projects WHERE api_key = $1
`;

export const createUserClientIPRecordQuery =
`
INSERT INTO interactions(api_key, ip_address, user_agent, referrer_url, device_information, cookies,device,region,additional_device_info)
VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9)
`

export const fetchSingleProjectNIpLogsQuery =
`
SELECT i.ip_address, i.timestamp, i.device, i.region , i.interaction_id, i.user_agent,i.additional_device_info FROM interactions i JOIN projects p ON i.api_key = p.api_key WHERE p.project_id = $1 ORDER BY i.timestamp DESC LIMIT $2 OFFSET $3;
`


export const projectLogStatics = 
`
    SELECT COUNT(DISTINCT i.ip_address) as unique_visitors,
    COUNT(*) as total_visits
    FROM interactions i
    JOIN projects p ON i.api_key = p.api_key
    WHERE p.project_id = $1
`;


export const fetchTopRegion = 
`
    SELECT i.region, COUNT(*) as visit_count FROM interactions i JOIN 
    projects p ON i.api_key = p.api_key 
    WHERE p.project_id = $1 GROUP BY i.region ORDER BY visit_count DESC LIMIT 1
`

export const verifyApiKeyQuery =
`
    SELECT project_id FROM projects WHERE api_key = $1
`

export const fetchProjectOwnerQuery =
`
    SELECT created_by FROM projects WHERE project_id = $1 and created_by = $2
`
export const checkUserExistsByEmailQuery =
`
    SELECT 1 as exists FROM users WHERE email = $1 LIMIT 1;
`
export const addUserToProjectQuery =
`
    INSERT INTO user_projects (project_id, uuid) VALUES ($1, $2);
`
export const fetchUserFromEmailQuery =
`
    SELECT uuid FROM users where email=$1 LIMIT 1;
`
export const fetchUsersAttachedWithProjectQuery =
`
WITH projectMembers AS (
    SELECT 
        u.email AS Email, 
        p.uuid 
    FROM user_projects AS p 
    JOIN users AS u 
        ON u.uuid = p.uuid 
    WHERE p.project_id = $1
    LIMIT 50
)
SELECT Email AS emails 
FROM projectMembers 
WHERE EXISTS (
    SELECT 1 
    FROM projectMembers 
    WHERE uuid = $2
);

`

export const removeUserFromProjectQuery =
`
DELETE FROM user_projects
WHERE uuid = $1 
  AND project_id = $2
  AND EXISTS (
    SELECT 1 
    FROM projects 
    WHERE project_id = $2 
      AND created_by = $3 
      AND created_by != $1
  );
`