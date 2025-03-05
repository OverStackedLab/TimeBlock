import React, { createContext, useContext, useState } from 'react';

type AuthContextType = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  user: { email: string; role: string } | null;
};

export function useSession() {
  const value = useContext(AuthContext);
  console.log('🚀 ~ useSession ~ value:', value);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <AuthProvider />');
    }
  }

  return value;
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  signUp: () => Promise.resolve(),
  isAuthenticated: false,
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(
    null,
  );

  const signIn = async (email: string, password: string) => {
    // Add your sign-in logic here
    // For demo purposes, we'll just set the user
    setUser({ email, role: 'Administrator' });
    setIsAuthenticated(true);
  };

  const signUp = async (email: string, password: string) => {
    // Add your sign-up logic here
    // For demo purposes, we'll just set the user
    setUser({ email, role: 'Administrator' });
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    // Add your sign-out logic here
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, signUp, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
