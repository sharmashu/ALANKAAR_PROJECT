import React, { createContext, useContext, useState, useEffect } from 'react';
import { config, getApiUrl } from '@/config/environment';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to load user from localStorage:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(getApiUrl('/auth/login'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        // Check if email is not verified
        if (data.emailNotVerified) {
          throw new Error('Please verify your email before logging in');
        }
        throw new Error(data.message || 'Login failed');
      }
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    console.log('Starting registration process...', { email, name });
    try {
      console.log('Sending registration request to server...');
      const response = await fetch(getApiUrl('/auth/register'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password, name }),
      });
      console.log('Received response from server:', { status: response.status });
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        console.error('Registration failed:', data.error);
        throw new Error(data.message || 'Registration failed');
      }
      
      // Store email for potential resend verification
      localStorage.setItem('pendingVerificationEmail', email);
      
      console.log('Registration successful, email verification required');
      // Don't set user as logged in since email verification is required
    } catch (error: any) {
      console.error('Registration error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw new Error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async (email: string) => {
    try {
      const response = await fetch(getApiUrl('/auth/resend-verification'), {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend verification email');
      }
      
      return data;
    } catch (error: any) {
      console.error('Resend verification error:', error);
      throw new Error(error.message || 'Failed to resend verification email');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('pendingVerificationEmail');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        resendVerification,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
