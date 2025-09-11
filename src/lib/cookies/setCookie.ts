import { cookies } from 'next/headers';

export async function setCookie(name: string, value: string, options?: Partial<CookieOptions>) {
  const cookieStore = cookies();

  (await cookieStore).set(name, value, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 360000 * 24, // 1 day
    ...options,
  });
}

interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  sameSite?: 'lax' | 'strict' | 'none';
  maxAge?: number;
}