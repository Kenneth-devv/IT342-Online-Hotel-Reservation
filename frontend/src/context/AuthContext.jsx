import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

export const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [isLoadingAuth, setIsLoadingAuth] = useState(true); // To indicate initial auth check is in progress

  // Function to check login status by calling the backend
  const checkLoginStatus = useCallback(async () => {
    setIsLoadingAuth(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setIsLoggedIn(true);
        setUserFullName(`${userData.firstName} ${userData.lastName}`);
      } else {
        setIsLoggedIn(false);
        setUserFullName('');
      }
    } catch (error) {
      console.error("Error checking login status:", error);
      setIsLoggedIn(false);
      setUserFullName('');
    } finally {
      setIsLoadingAuth(false);
    }
  }, []);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]); 

  const authContextValue = {
    isLoggedIn,
    userFullName,
    isLoadingAuth,
    checkLoginStatus, 
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
