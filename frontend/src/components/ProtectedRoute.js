import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute component ensures only authenticated users can access certain pages
// Optional: pass requireRole to restrict to specific roles (e.g., 'host')
const ProtectedRoute = ({ children, requireRole = null }) => {
  const { isAuthenticated, user } = useAuth();

  // If not authenticated, redirect to home (LoginModal will trigger on navigation)
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If a specific role is required, check if user has it
  if (requireRole && user?.roles && !user.roles.includes(requireRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
