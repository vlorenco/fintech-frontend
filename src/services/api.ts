import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};


const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};


const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};


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


api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      removeAuthToken();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    console.error('API Error:', error.response?.data || error.message);
    
    return Promise.reject(error);
  }
);


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


export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    removeAuthToken();
  }
};


export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

export default api;
export { getAuthToken, setAuthToken, removeAuthToken };