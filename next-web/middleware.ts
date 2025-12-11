import { NextResponse } from 'next/server';
import axios from 'axios';
import axiosInstance from './lib/axiosInstance';

export async function middleware(req:any) {

  const authToken = req.cookies.get('token');

  // Define routes
  const publicRoutes = ['/sign-in', '/sign-up'];
  const adminRoutes = ['/admin'];
  const studentRoutes = ['/student'];
  const staffRoutes = ['/staff'];
  const dashboardRoutes = ['/dashboard'];
  const hodRoute = ['/hod']
  const supportStaffRoute = ['/support-staff']

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

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/validate`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', 
        cookie: `token=${authToken.value}`
      }
    });
    const data = await response.json();
    const role = data.data.role
    
  
    if (adminRoutes.includes(req.nextUrl.pathname) && role!== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (studentRoutes.includes(req.nextUrl.pathname) && role !== 'STUDENT' && authToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (staffRoutes.includes(req.nextUrl.pathname) && role !== 'STAFF' && authToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    if (hodRoute.includes(req.nextUrl.pathname) && role !== 'HOD' && authToken) {
      return NextResponse.redirect(new URL('/', req.url));
    } 
    
    if (supportStaffRoute.includes(req.nextUrl.pathname) && role !== 'SUPPORT_STAFF' && authToken) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    // return NextResponse.next();
  } catch (error) {
    // console.error('Error validating token:', error.message); );
    return NextResponse.redirect(new URL('/sign-in', req.url));


  }
}

// Apply middleware to relevant routes
export const config = {
  matcher: ['/dashboard', '/admin/:path*','/staff/:path*' ,'/student/:path*' ,'/sign-in', '/sign-up','/hod', '/support-staff'],
};
