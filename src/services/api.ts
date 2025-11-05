import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Configuração base da API
const API_BASE_URL = 'http://localhost:8080/api';

// Criar instância do axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para obter o token do localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Função para definir o token no localStorage
const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Função para remover o token do localStorage
const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Interceptor de request - adiciona token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de response - trata erros globalmente
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Se o token expirou ou é inválido, remove do localStorage
    if (error.response?.status === 401) {
      removeAuthToken();
      // Redireciona para login se não estiver na página de login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Log do erro para desenvolvimento
    console.error('API Error:', error.response?.data || error.message);
    
    return Promise.reject(error);
  }
);

// Função de login
export const login = async (email: string, senha: string) => {
  try {
    const response = await api.post('/auth/login', { email, senha });
    const { token } = response.data;
    setAuthToken(token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Função de logout
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    removeAuthToken();
  }
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

// Exportar a instância da API para uso em outros serviços
export default api;

// Exportar funções utilitárias de auth
export { getAuthToken, setAuthToken, removeAuthToken };