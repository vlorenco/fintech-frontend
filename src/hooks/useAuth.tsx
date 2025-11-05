import { useAuth } from "../contexts/AuthContext";

// Re-export do hook para facilitar o uso
export { useAuth } from "../contexts/AuthContext";

// Hook para verificar se está autenticado
export function useIsAuthenticated() {
  const { isLoggedIn } = useAuth();
  return isLoggedIn;
}

// Hook para obter dados do usuário
export function useUser() {
  const { user } = useAuth();
  return user;
}