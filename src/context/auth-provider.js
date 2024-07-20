"use client"
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

// Create AuthContext
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = (response) => {
    const { access_token, refresh_token, user } = response;
    console.log("response", response)
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
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/refresh/`, { token: refreshToken }, { withCredentials: true });
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      return access_token;
    } catch (error) {
      console.error('Refresh token failed:', error);
      logout();
      throw error;
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/auth/me/`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to initialize authentication:', error);
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
