import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { isAuthenticated, logout as apiLogout } from "../services";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar a aplicação
    const checkAuth = () => {
      if (isAuthenticated()) {
        // Aqui você pode fazer uma chamada para obter os dados do usuário
        // Por enquanto, vou simular com dados básicos
        const token = localStorage.getItem('authToken');
        if (token) {
          // Em um cenário real, você decodificaria o JWT ou faria uma chamada para /me
          setUser({
            id: 1,
            nome: "Usuário",
            email: "user@example.com"
          });
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login: handleLogin,
    logout: handleLogout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}