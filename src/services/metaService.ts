import api from './api';
import type { 
  Meta, 
  CreateMetaRequest, 
  UpdateMetaRequest,
  ContribuicaoMetaRequest 
} from '../types';

// Serviços para Metas
export const metaService = {
  // GET /api/metas
  getAll: async (): Promise<Meta[]> => {
    console.log('🔍 metaService.getAll() - Fazendo requisição para /api/metas');
    const response = await api.get('/metas');
    console.log('📦 Resposta da API:', response);
    console.log('📦 Status:', response.status);
    console.log('📦 Data:', response.data);
    const data = response.data;
    
    // Garantir que sempre retornamos um array
    if (Array.isArray(data)) {
      console.log(`✅ Array recebido com ${data.length} itens`);
      return data;
    }
    
    // Se não for array, mas for um objeto válido, transformar em array
    if (data && typeof data === 'object') {
      console.warn('⚠️ Backend retornou objeto ao invés de array em /api/metas');
      return [data];
    }
    
    // Se for null/undefined, retornar array vazio
    console.warn('⚠️ Backend retornou null/undefined');
    return [];
  },

  // GET /api/metas/{id}
  getById: async (id: number): Promise<Meta> => {
    const response = await api.get(`/metas/${id}`);
    return response.data;
  },

  // GET /api/metas/ativas
  getAtivas: async (): Promise<Meta[]> => {
    const response = await api.get('/metas/ativas');
    return response.data;
  },

  // GET /api/metas/concluidas
  getConcluidas: async (): Promise<Meta[]> => {
    const response = await api.get('/metas/concluidas');
    return response.data;
  },

  // POST /api/metas
  create: async (meta: CreateMetaRequest): Promise<Meta> => {
    const response = await api.post('/metas', meta);
    return response.data;
  },

  // PUT /api/metas/{id}
  update: async (id: number, meta: UpdateMetaRequest): Promise<Meta> => {
    const response = await api.put(`/metas/${id}`, meta);
    return response.data;
  },

  // DELETE /api/metas/{id}
  delete: async (id: number): Promise<void> => {
    await api.delete(`/metas/${id}`);
  },

  // POST /api/metas/{id}/contribuir
  contribuir: async (id: number, contribuicao: ContribuicaoMetaRequest): Promise<Meta> => {
    const response = await api.post(`/metas/${id}/contribuir`, contribuicao);
    return response.data;
  },

  // PUT /api/metas/{id}/pausar
  pausar: async (id: number): Promise<Meta> => {
    const response = await api.put(`/metas/${id}/pausar`);
    return response.data;
  },

  // PUT /api/metas/{id}/reativar
  reativar: async (id: number): Promise<Meta> => {
    const response = await api.put(`/metas/${id}/reativar`);
    return response.data;
  },

  // GET /api/metas/{id}/historico
  getHistorico: async (id: number): Promise<any[]> => {
    const response = await api.get(`/metas/${id}/historico`);
    return response.data;
  }
};