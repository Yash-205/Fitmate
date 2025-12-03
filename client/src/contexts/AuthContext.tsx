import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface User {
  _id: string;
  email: string;
  name: string;
  role?: string | null;
  avatar?: string;
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User | null>;
  register: (email: string, password: string, name: string) => Promise<User | null>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/auth/profile');
      setUser(response.data as User);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<User | null> => {
    try {
      const response = await api.post('/auth/register', {
        email,
        password,
        name,
      });

      const userData = response.data as User;
      setUser(userData);
      return userData;

    } catch (error: any) {
      alert(error.response?.data?.message || 'Registration failed');
      return null;
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const response = await api.post('/auth/login', { email, password });

      const userData = response.data as User;
      setUser(userData);
      return userData;

    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
      return null;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshUser = async () => {
    await checkAuth();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        refreshUser,
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
