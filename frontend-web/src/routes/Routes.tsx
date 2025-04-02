import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import axios from 'axios';
import Home from '../pages/Home';
import Branch from '../pages/Branch';
import Semester from '../pages/Semester';
import Calendar from '@/pages/Calendar';
import DaySchedule from '@/pages/DaySchedule';
import SeeSchedule from '@/pages/SeeSchedule';
import SemAcadamics from '@/pages/SemAcadamics';
import Staff from '@/pages/Staff';
import StaffSchedule from '@/pages/StaffSchedule';
import LoginForm from '@/pages/auth/Login';
import RoleProtectedRoute from '@/components/RoleProtectedRoute';

export default function AppRoutes() {

  
  // Verify token and fetch user if we have a token but no user data
  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     if (token) {
  //       try {
  //         // Set token for all requests
  //         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
  //         // Verify token and get fresh user data
  //         const res = await axios.get(`${backendUrl}/api/auth/verify-token`);
          
  //         if (res.data.user) {
  //           // Update user data in store
  //           setAuth(token, res.data.user);
  //         } else {
  //           // If verification fails, logout
  //           logout();
  //         }
  //       } catch (error) {
  //         console.error('Token verification failed:', error);
  //         logout();
  //       }
  //     }
  //   };
    
  //   verifyAuth();
  // }, [token, backendUrl, setAuth, logout]);

  return (
    <Routes>
    

      {/* Admin-Only Routes */}
      <Route >
      <Route path="/" element={<Home />} />

        <Route path="/branch/:branch" element={<Branch />} />
        <Route path="/branch/:branch/:semester" element={<Semester />} />
        <Route path="/branch/:branch/:semester/calendar" element={<Calendar />} />
        <Route path="/branch/:branch/:semester/:day" element={<DaySchedule />} />
        <Route path="/branch/:branch/:semester/:day/see" element={<SeeSchedule />} />

        <Route path="/subjects/:branch" element={<Branch />} />
        <Route path="/subjects/:branch/:semester" element={<Semester />} />
        <Route path="/subjects/:branch/:semester/create" element={<Calendar />} />
        <Route path="/subjects/:branch/:semester/:schema" element={<SemAcadamics />} />
      </Route>

      {/* Staff-Only Routes */}
      <Route element={<RoleProtectedRoute allowedRoles={['STAFF']} />}>
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/:day" element={<StaffSchedule />} />
      </Route>

      {/* Catch-all: redirect to login if not authenticated, home if authenticated */}
    
    </Routes>
  );
}