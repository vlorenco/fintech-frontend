import api from './api';
import type { 
  Receita, 
  CreateReceitaRequest, 
  UpdateReceitaRequest 
} from '../types';

// Serviços para Receitas
export const receitaService = {
  // GET /api/receitas
  getAll: async (): Promise<Receita[]> => {
    const response = await api.get('/receitas');
    return response.data;
  },

  // GET /api/receitas/{id}
  getById: async (id: number): Promise<Receita> => {
    const response = await api.get(`/receitas/${id}`);
    return response.data;
  },

  // GET /api/receitas/categoria/{categoriaId}
  getByCategoria: async (categoriaId: number): Promise<Receita[]> => {
    const response = await api.get(`/receitas/categoria/${categoriaId}`);
    return response.data;
  },

  // GET /api/receitas/periodo?dataInicio={dataInicio}&dataFim={dataFim}
  getByPeriodo: async (dataInicio: string, dataFim: string): Promise<Receita[]> => {
    const response = await api.get(`/receitas/periodo`, {
      params: { dataInicio, dataFim }
    });
    return response.data;
  },

  // POST /api/receitas
  create: async (receita: CreateReceitaRequest): Promise<Receita> => {
    const response = await api.post('/receitas', receita);
    return response.data;
  },

  // PUT /api/receitas/{id}
  update: async (id: number, receita: UpdateReceitaRequest): Promise<Receita> => {
    const response = await api.put(`/receitas/${id}`, receita);
    return response.data;
  },

  // DELETE /api/receitas/{id}
  delete: async (id: number): Promise<void> => {
    await api.delete(`/receitas/${id}`);
  }
};