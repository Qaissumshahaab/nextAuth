import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export async function middleware(request) {

  const token= request.cookies.get("token")?.value ||"";

    const publicPaths = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup";

  if (!token && !publicPaths) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
    
}
export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup"
  ]
};