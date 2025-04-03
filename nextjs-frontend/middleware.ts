import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(() => {
  return NextResponse.next();
  publicRoutes: ['/sign-in', '/sign-up', '/sign-up/*']
});

export const config = {
  matcher: ['/((?!_next/image|_next/static|favicon.ico|robots.txt).*)'],
};