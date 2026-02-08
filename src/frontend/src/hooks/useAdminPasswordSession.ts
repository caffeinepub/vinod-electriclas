import { useState, useEffect } from 'react';

const SESSION_KEY = 'admin_password_session';

interface AdminSession {
  authenticated: boolean;
  password: string;
}

export function useAdminPasswordSession() {
  const [session, setSession] = useState<AdminSession>(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          authenticated: parsed.authenticated === true,
          password: parsed.password || '',
        };
      }
    } catch (e) {
      console.error('Failed to restore admin session:', e);
    }
    return { authenticated: false, password: '' };
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.error('Failed to persist admin session:', e);
    }
  }, [session]);

  const login = (password: string) => {
    setSession({ authenticated: true, password });
  };

  const logout = () => {
    setSession({ authenticated: false, password: '' });
    sessionStorage.removeItem(SESSION_KEY);
  };

  return {
    isAuthenticated: session.authenticated,
    password: session.password,
    login,
    logout,
  };
}
