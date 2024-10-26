import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request:NextRequest){
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/SignUp' || path === '/verifyemail'

    const token = request.cookies.get('token')?.value || '';

    if (isPublicPath && token){
        return NextResponse.redirect(new URL('/Dashboard',request.nextUrl.href))
    }
    if (!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl.href))
    }
}

export const config={
    matcher: [
        '/Dashboard',
        '/login',
        '/SignUp',
        // '/verifyemail',
    ],
}
