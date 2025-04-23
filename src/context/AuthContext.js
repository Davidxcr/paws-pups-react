import React, { createContext, useState, useEffect } from 'react';
import { updateIntercom, shutdownIntercom } from '../services/intercom';

// Create the authentication context
export const AuthContext = createContext();

// API URL
const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('pawspupsUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('pawspupsToken') !== null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('pawspupsToken') || null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update localStorage when authentication state changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('pawspupsUser', JSON.stringify(currentUser));
      
      // Update Intercom with user data
      updateIntercom({
        name: currentUser.name,
        email: currentUser.email,
        user_id: currentUser.id
      });
    } else {
      localStorage.removeItem('pawspupsUser');
      
      // Shutdown Intercom session when user logs out
      shutdownIntercom();
    }
  }, [currentUser]);

  // Update localStorage when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('pawspupsToken', token);
    } else {
      localStorage.removeItem('pawspupsToken');
    }
  }, [token]);

  // Login function
  const login = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setCurrentUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setCurrentUser(data.user);
      setToken(data.token);
      setIsAuthenticated(true);
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return false;
    }
  };

  // Get user profile
  const getProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if token exists
      if (!token) {
        setError('Authentication token is missing');
        setLoading(false);
        return false;
      }

      console.log('Fetching profile with token:', token ? 'token exists' : 'no token');
      
      const response = await fetch(`${API_URL}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });

      const data = await response.json();
      console.log('Profile API response:', response.status, response.ok ? 'success' : 'failed');

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get profile');
      }

      // Update user data from API response
      setCurrentUser({
        ...data,
        // Ensure we have all the required fields
        id: data.id,
        name: data.name,
        email: data.email,
        created_at: data.created_at
      });
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Profile fetch error:', error);
      setError(error.message || 'Error loading profile');
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  // Provide the authentication context to children components
  return (
    <AuthContext.Provider 
      value={{ 
        currentUser, 
        isAuthenticated, 
        login, 
        register, 
        logout, 
        getProfile, 
        loading, 
        error 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
