import api from './api';
import type { 
  Despesa, 
  CreateDespesaRequest, 
  UpdateDespesaRequest 
} from '../types';

// Serviços para Despesas
export const despesaService = {
  // GET /api/despesas
  getAll: async (): Promise<Despesa[]> => {
    const response = await api.get('/despesas');
    return response.data;
  },

  // GET /api/despesas/{id}
  getById: async (id: number): Promise<Despesa> => {
    const response = await api.get(`/despesas/${id}`);
    return response.data;
  },

  // GET /api/despesas/categoria/{categoriaId}
  getByCategoria: async (categoriaId: number): Promise<Despesa[]> => {
    const response = await api.get(`/despesas/categoria/${categoriaId}`);
    return response.data;
  },

  // GET /api/despesas/periodo?dataInicio={dataInicio}&dataFim={dataFim}
  getByPeriodo: async (dataInicio: string, dataFim: string): Promise<Despesa[]> => {
    const response = await api.get(`/despesas/periodo`, {
      params: { dataInicio, dataFim }
    });
    return response.data;
  },

  // POST /api/despesas
  create: async (despesa: CreateDespesaRequest): Promise<Despesa> => {
    const response = await api.post('/despesas', despesa);
    return response.data;
  },

  // PUT /api/despesas/{id}
  update: async (id: number, despesa: UpdateDespesaRequest): Promise<Despesa> => {
    const response = await api.put(`/despesas/${id}`, despesa);
    return response.data;
  },

  // DELETE /api/despesas/{id}
  delete: async (id: number): Promise<void> => {
    await api.delete(`/despesas/${id}`);
  }
};