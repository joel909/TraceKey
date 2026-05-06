import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { AuthenticationError } from './lib/errors/extended_errors/AuthenticationError';
// const auth_routes = ["/dashboard", "/settings", "/project"];
const non_auth_routes = ["/login", "/signup", "/api/logout"];

function buildOpenCorsHeaders(request: NextRequest) {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": request.headers.get("access-control-request-headers") || "*",
    };
}

export function middleware(request: NextRequest) {
    console.log("Middleware Executed");
    const redirectTo = NextResponse.redirect;
    const requestedPath = request.nextUrl.pathname;

    if (requestedPath.startsWith("/api/")) {
        const corsHeaders = buildOpenCorsHeaders(request);

        if (request.method === "OPTIONS") {
            return new NextResponse(null, {
                status: 204,
                headers: corsHeaders,
            });
        }

        const response = NextResponse.next();
        Object.entries(corsHeaders).forEach(([key, value]) => {
            response.headers.set(key, value);
        });
        return response;
    }

    try{
        const auth_key = request.cookies.get('auth_key')?.value;
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
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|project/sample).*)',
  ],
};
