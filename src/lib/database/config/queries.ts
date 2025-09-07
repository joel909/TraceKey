export const createUserQuery = `
    INSERT INTO users (email, name, password, auth_key)
    VALUES ($1, $2, $3, $4)
    RETURNING uuid, email, name, auth_key;
`;
