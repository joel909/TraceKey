interface AccountData {
  uuid?: string;
  email?: string;
  name?: string;
  auth_key?: string;
  error: string | "unknown error";
  field?: string;
}

export default interface AccountCreationResponse {
  error: boolean;
  field: string;
  status: string;
  statusText: string;
  message: string;
  data: AccountData[];
}