import { NextResponse } from 'next/server';

// Middleware Function
export async function middleware(req) {
  const authToken = req.cookies.get('token');

  // Define route access
  const publicRoutes = ['/sign-in', '/register'];
  const adminRoutes = ['/admin'];
  const userRoutes = ['/dashboard'];

  // If no token and not on public routes, redirect to sign-in
  if (!authToken && !publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // If user is accessing sign-in while already authenticated, redirect to dashboard
  if (authToken && publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Validate the token using the API route
  try {
    const response = await fetch('http://localhost:3000/api/auth/validate', {
      method: 'GET',
      headers: {
        Cookie: `authToken=${authToken.value}`,
      },
    });

    if (!response.ok) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    const data = await response.json();

    // Role-Based Authorization
    if (adminRoutes.includes(req.nextUrl.pathname) && data.role !== 'A') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    if (userRoutes.includes(req.nextUrl.pathname) && data.role !== 'STUDENT' ) {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error validating token:', error);
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }
}

// Apply middleware to relevant routes
export const config = {
  matcher: ['/dashboard', '/admin/:path*', '/sign-in', '/register'],
};
