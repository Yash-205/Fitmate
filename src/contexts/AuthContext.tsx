import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('fitcoach_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Get existing users
      const usersStr = localStorage.getItem('fitcoach_users');
      const users = usersStr ? JSON.parse(usersStr) : [];

      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        alert('User with this email already exists');
        return false;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password, // In production, never store passwords in plain text!
        name,
      };

      users.push(newUser);
      localStorage.setItem('fitcoach_users', JSON.stringify(users));

      // Log the user in
      const userToStore = { id: newUser.id, email: newUser.email, name: newUser.name };
      setUser(userToStore);
      localStorage.setItem('fitcoach_user', JSON.stringify(userToStore));

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get users from localStorage
      const usersStr = localStorage.getItem('fitcoach_users');
      const users = usersStr ? JSON.parse(usersStr) : [];

      // Find user
      const foundUser = users.find((u: any) => u.email === email && u.password === password);

      if (!foundUser) {
        alert('Invalid email or password');
        return false;
      }

      // Set user
      const userToStore = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
      setUser(userToStore);
      localStorage.setItem('fitcoach_user', JSON.stringify(userToStore));

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fitcoach_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
