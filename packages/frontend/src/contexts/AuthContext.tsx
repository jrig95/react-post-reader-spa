import React, { createContext, useState, useContext } from 'react';

export type AuthContextType = {
  token: string;
  setToken: (token: string) => void;
};

interface AuthProviderProps {
  children: React.Component;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string>('');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
