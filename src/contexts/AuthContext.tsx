import React, { createContext, useContext, useState } from 'react';
import { AuthState, User } from '../types/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [auth, setAuth] = useState<AuthState>(() => {
    const savedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    return {
      isAuthenticated: !!savedUser,
      user: savedUser ? JSON.parse(savedUser) : null,
    };
  });

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      if (email === 'admin@km.com' && password === 'admin') {
        const user: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@km.com',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        };
        
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('user', JSON.stringify(user));
        
        setAuth({ isAuthenticated: true, user });
        navigate('/'); // Navigate to project selection page
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const user: User = {
        id: crypto.randomUUID(),
        name,
        email,
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      setAuth({ isAuthenticated: true, user });
      navigate('/');
    } catch (error) {
      throw new Error('Failed to create account');
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setAuth({ isAuthenticated: false, user: null });
    navigate('/login');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!auth.user) return;

    const updatedUser = { ...auth.user, ...data };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setAuth({ ...auth, user: updatedUser });
  };

  return (
    <AuthContext.Provider value={{
      ...auth,
      login,
      signup,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}