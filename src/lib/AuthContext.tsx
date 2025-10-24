import React, { createContext, useContext, useEffect, useState } from 'react';
import api from './api';

type User = { id?: number; email?: string; role?: string } | null;

type AuthContextType = {
  user: User;
  setUser: (u: User) => void;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: async () => { throw new Error('not implemented'); },
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) return;
    (async ()=>{
      try {
        const me = await api.get('/auth/me');
        setUser(me);
      } catch (err) {
        console.error('AuthProvider: could not fetch /auth/me', err);
        // invalid token -> clear
        localStorage.removeItem('token');
        setUser(null);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    // call backend login endpoint, store token, fetch current user
    const resp = await api.post('/auth/login', { email, password });
    const token = resp?.token;
    if (!token) throw new Error('Login did not return a token');
    localStorage.setItem('token', token);
    const me = await api.get('/auth/me');
    setUser(me);
    return me;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
