import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, loading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem'
      }}>
        Carregando...
      </div>
    );
  }

  // Se não estiver logado, redireciona para login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza o conteúdo
  return <>{children}</>;
}