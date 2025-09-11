// lib/services/accountService.ts
import UserHandler from "@/lib/database/user/UserHandler";
import gen_auth_key from "@/lib/utils/auth_key";
import { cleanInputForServer } from "@/lib/auth/api-functions/cleanInputs";
import validateAuthInput from "@/lib/auth/frontend-functions/validateAuthInput";
import { setCookie } from "@/lib/cookies/setCookie";
import { ValidationError } from "@/lib/errors/ValidationError";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  path: '/',
  maxAge: 60 * 60 * 24 * 30, // 30 days
  sameSite: 'lax' as 'lax' | 'strict' | 'none' | undefined,
};

export async function createAccountService({ username, email, password }: { username: string, email: string, password: string }) {
  if (!username || !email || !password) {
    throw new ValidationError("Username, email, and password are required", "missing_fields");
  }

  const userHandler = new UserHandler();

  // clean inputs
  username = cleanInputForServer(username);
  email = cleanInputForServer(email);
  password = cleanInputForServer(password);

  // validate
  const [isValid, fields, reason] = validateAuthInput(email, password, username);
  if (!isValid) {
    throw new ValidationError(reason, fields);
  }

  const auth_key = gen_auth_key();

  const user = await userHandler.createUser(email, username, password, auth_key);

  // set cookies
  await setCookie('auth_key', auth_key, COOKIE_OPTIONS);
  await setCookie('username', username, COOKIE_OPTIONS);
  await setCookie('email', email, COOKIE_OPTIONS);

  return {
    message: "Account created successfully!",
    data: user,
  };
}
