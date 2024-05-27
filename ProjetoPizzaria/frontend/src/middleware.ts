import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('@nextauth.token')?.value;

  const signInURL = new URL(`/`, request.url);
  const dashboard = new URL(`/dashboard`, request.url);

  if(!token) {
    if(request.nextUrl.pathname === '/'){
      return NextResponse.next();
    }
    return NextResponse.redirect(signInURL);
  }

  if(request.nextUrl.pathname === '/'){
    return NextResponse.redirect(dashboard);
  }

}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/category/:path*', '/product/:path*'],
};
