import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../api/mockData';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check valid session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  };

  const signup = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    // Check if email exists
    if (mockUsers.some(u => u.email === userData.email)) {
      throw new Error('Email already registered');
    }

    // In a real app we'd save it to DB, but for mock just log them in
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData
    };

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (updates) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
