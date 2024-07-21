"use client";
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Create AuthContext
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  refreshToken: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = (response) => {
    const { access_token, refresh_token, user } = response;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    setUser(user);
    router.push('/session');
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    router.push('/auth');
  };

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/refresh/`, {
          refresh: refreshToken,
        });
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        return access;
      } else {
        throw new Error('No refresh token found');
      }
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true); // Ensure loading state is set
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/me/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          setUser(response.data);
        } else {
          logout();
        }
      } catch (error) {
        if (error.response?.status === 401) {
          await refreshToken();
          await initializeAuth();
        } else {
          console.error('Failed to initialize authentication:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, [refreshToken]);

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {!loading ? children : <p>Loading...</p>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
