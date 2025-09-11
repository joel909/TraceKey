import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import fetchUserInfo from './lib/database/user/user/fetchUserInfo';
import { AuthenticationError } from './lib/errors/AuthenticationError';
import requestUserData from './lib/auth/ssr-functions/requestUserData';
export function middleware(request: NextRequest) {
    //console.log("Middleware Executed");
    const response = NextResponse.next();
    const redirectTo = NextResponse.redirect;
    try{
        const auth_key = request.cookies.get('auth_key')?.value;
        const requestedPath = request.nextUrl.pathname;
        if (!auth_key && requestedPath !== '/login' && requestedPath !== '/signup') {
            return redirectTo(new URL('/signup', request.url));
        } else if (auth_key && (requestedPath === '/login' || requestedPath === '/signup')) {
            const userData = requestUserData(auth_key);
            return redirectTo(new URL('/dashboard', request.url));
        }

        
    }catch(e){
        console.error("Middleware Error:", e);
        if (e instanceof AuthenticationError) {
            const allCookies = request.cookies.getAll();
            allCookies.forEach(cookie => {
                response.cookies.set(cookie.name, '', {
                maxAge: 0,
                path: '/',
                });
            });
            return redirectTo(new URL('/login', request.url));
        }
        else{
            return redirectTo(new URL('/login', request.url));
        }

    }
    
    //console.log("Requested Path:", requestedPath, auth_key);
    
    return NextResponse.next();

}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};