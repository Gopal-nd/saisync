import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

interface RoleProtectedRouteProps {
  allowedRoles: string[];
}

const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();

  // First check if authenticated at all
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Then check if user has the required role
  if (!allowedRoles.includes(user.role)) {
    // Redirect to homepage if authenticated but wrong role
    return <Navigate to="/" replace />;
  }

  // Allow access if authenticated and has the correct role
  return <Outlet />;
};

export default RoleProtectedRoute;