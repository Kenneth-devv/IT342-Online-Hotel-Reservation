import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Blocks route access for unauthenticated users
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or a spinner/loading state
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Blocks route access for authenticated users (e.g., /login, /signup)
export const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};
