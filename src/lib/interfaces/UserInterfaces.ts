export interface UserCreationRequestInterface {
    email: string;
    username: string;
    password: string;
}

export interface AccountCreationResponse {
    uuid : string
    email: string;
    name: string;
    auth_key: string;
}

export interface UserInfoInterface {
    uuid: string;
    email: string;
    name: string;
}