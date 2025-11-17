"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { User, UserRole } from './types';
import { mockUsers } from './data';

interface AuthContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUsers['user-1']); // Default to admin for dev

  const login = (role: UserRole) => {
    // In a real app, this would involve an API call.
    // For now, we'll just find the first mock user with that role.
    const userToLogin = Object.values(mockUsers).find(u => u.role === role) || null;
    setUser(userToLogin);
  };

  const logout = () => {
    // In a real app, this would clear tokens, etc.
    setUser(null);
    // Here you would redirect to /login
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
