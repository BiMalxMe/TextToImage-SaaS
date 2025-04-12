import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req :NextRequest) {
  // You can handle any custom logic here, for example, authentication or access control.
  // If you just want to allow certain public routes, you can check the request URL.

  const publicRoutes = ['/sign-in', '/sign-up', '/']; // or better: use RegExp

  if (publicRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    // If the route is public, just allow the request to pass through
    return NextResponse.next();
  }

  // Otherwise, you can redirect or send a custom response here if needed
  // Example: return NextResponse.redirect(new URL('/login', req.url));
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/image|_next/static|favicon.ico|robots.txt).*)'],
};
