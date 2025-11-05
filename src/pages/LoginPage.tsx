import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services";
import { useAuth } from "../hooks/useAuth";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login: setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Fazer login real com a API
      const response = await login(formData.email, formData.password);
      console.log("Login realizado com sucesso:", response);
      
      // Atualizar o contexto de auth com os dados do usuário
      setUser(response.usuario);
      
      // Redirecionar para o dashboard
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      console.error("Erro no login:", err);
      
      // Tratar diferentes tipos de erro
      if (err.response?.status === 401) {
        setError("E-mail ou senha incorretos");
      } else if (err.response?.status === 404) {
        setError("Usuário não encontrado");
      } else if (err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')) {
        setError("Erro de conexão. Verifique se o servidor está rodando");
      } else {
        setError("Erro interno do servidor. Tente novamente");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img 
            src="/images/logo.png" 
            alt="Fintech" 
            className="login-logo"
          />
          <h1 className="login-title">Bem-vindo de volta</h1>
          <p className="login-subtitle">
            Faça login para acessar sua conta
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">E-mail</label>
            <input
              type="email"
              className="login-input"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="login-field">
            <label className="login-label">Senha</label>
            <input
              type="password"
              className="login-input"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

      </div>
    </div>
  );
}