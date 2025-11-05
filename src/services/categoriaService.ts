import api from './api';
import type { 
  Categoria, 
  CreateCategoriaRequest, 
  UpdateCategoriaRequest 
} from '../types';

// Serviços para Categorias
export const categoriaService = {
  // GET /api/categorias
  getAll: async (): Promise<Categoria[]> => {
    const response = await api.get('/categorias');
    return response.data;
  },

  // GET /api/categorias/{id}
  getById: async (id: number): Promise<Categoria> => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  // GET /api/categorias/tipo/{tipo}
  getByTipo: async (tipo: 'RECEITA' | 'DESPESA'): Promise<Categoria[]> => {
    const response = await api.get(`/categorias/tipo/${tipo}`);
    return response.data;
  },

  // POST /api/categorias
  create: async (categoria: CreateCategoriaRequest): Promise<Categoria> => {
    const response = await api.post('/categorias', categoria);
    return response.data;
  },

  // PUT /api/categorias/{id}
  update: async (id: number, categoria: UpdateCategoriaRequest): Promise<Categoria> => {
    const response = await api.put(`/categorias/${id}`, categoria);
    return response.data;
  },

  // DELETE /api/categorias/{id}
  delete: async (id: number): Promise<void> => {
    await api.delete(`/categorias/${id}`);
  }
};