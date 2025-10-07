import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { AuthenticationError } from './lib/errors/AuthenticationError';
import { non_auth_routes } from './middleware/non-auth.paths';
export function middleware(request: NextRequest) {
    //console.log("Middleware Executed");
    const redirectTo = NextResponse.redirect;
    try{
        const auth_key = request.cookies.get('auth_key')?.value;
        const requestedPath = request.nextUrl.pathname;
        if (!auth_key && !non_auth_routes.includes(requestedPath)) {
            return redirectTo(new URL('/signup', request.url));
        } else if (auth_key && (requestedPath === '/login' || requestedPath === '/signup')) {
            return redirectTo(new URL('/dashboard', request.url));
        }

        
    }catch(e){
        console.error("Middleware Error:", e);
        if (e instanceof AuthenticationError) {
            return redirectTo(new URL('/logout', request.url));
    }
}
    
    //console.log("Requested Path:", requestedPath, auth_key);
    
    return NextResponse.next();

}
export const config = {
  matcher: [
    '/((?!api/logout|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
