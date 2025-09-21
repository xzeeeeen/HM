

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock checking for a logged-in user in local storage
    setTimeout(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user');
        }
        setLoading(false);
    }, 500);
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simple validation for mock
    if (email && pass) { 
        let mockUser: User;
        if (email.toLowerCase() === 'admin@humanminority.pro') {
            mockUser = { id: 'admin-001', name: 'Admin', email, role: 'admin', joined: '2023-01-01', status: 'Active' };
        } else {
            mockUser = { id: '1', name: 'Trader Joe', email, role: 'member', joined: '2023-10-26', status: 'Active' };
        }
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
    }
    setLoading(false);
  };
  
  const register = async (name: string, email: string, pass: string) => {
    setLoading(true);
    // Mock API call for registration
    await new Promise(resolve => setTimeout(resolve, 700));
    // Simple validation for mock
    if (name && email && pass) {
        // In a real app, you'd check if the email is already taken.
        // Here, we'll just create a new user and log them in.
        const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            role: 'member',
            joined: new Date().toISOString().split('T')[0],
            status: 'Active',
        };
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    }
    setLoading(false);
  };


  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};