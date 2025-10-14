import { NextResponse } from 'next/server';
import fetchUserInfo from '@/lib/database/user/user/fetchUserInfo';
import { AuthenticationError } from '@/lib/errors/extended_errors/AuthenticationError';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const auth_key = searchParams.get('auth_key');
    //console.log("Auth Key:", auth_key);
    const userInfo = await fetchUserInfo(auth_key as string);
    return NextResponse.json({ data:userInfo }, { status: 200 });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json({ error: error.message }, { status: 422 });
    }
    console.error('Error fetching user info:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}
