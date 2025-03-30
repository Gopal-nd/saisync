import { NextResponse } from 'next/server';
import axios from 'axios';

export async function middleware(req) {
  const authToken = req.cookies.get('token');

  // Define routes
  const publicRoutes = ['/sign-in', '/register'];
  const adminRoutes = ['/admin'];
  const userRoutes = ['/dashboard'];
  const homeRoutes = ['/'];


  if (!authToken) {

    if (!publicRoutes.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
    return NextResponse.next();
  }

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  try {

    const response = await axios.get(`${req.nextUrl.origin}/api/auth/validate`, {
      headers: {
        Cookie: `token=${authToken?.value}`,
      },
      withCredentials: true,
    });

    const data = response.data;

  
    if (adminRoutes.includes(req.nextUrl.pathname) && data.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (userRoutes.includes(req.nextUrl.pathname) && data.role !== 'STUDENT') {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    if (homeRoutes.includes(req.nextUrl.pathname) && !data.isValid) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error validating token:', error?.response?.data || error.message);
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
}

// Apply middleware to relevant routes
export const config = {
  matcher: ['/dashboard', '/admin/:path*', '/sign-in', '/register', '/'],
};
