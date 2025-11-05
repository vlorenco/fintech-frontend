// Tipos para Autenticação
export interface User {
  id: number;
  nome: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: User;
  expiresIn: number;
}

// Tipos para Categorias
export interface Categoria {
  idCategoria: number;
  idUsuario: number;
  nome: string;
  cor: string;
}

export interface CreateCategoriaRequest {
  nome: string;
  cor: string;
}

export interface UpdateCategoriaRequest {
  nome?: string;
  cor?: string;
}

// Tipos para Receitas
export interface Receita {
  idReceita: number;
  idUsuario: number;
  idCategoria: number;
  descricao: string;
  valor: number;
  dataMov: string; // ISO date string
  status: 'PAGO' | 'PENDENTE';
}

export interface CreateReceitaRequest {
  descricao: string;
  valor: number;
  dataMov: string;
  idCategoria: number;
  status: 'PAGO' | 'PENDENTE';
}

export interface UpdateReceitaRequest {
  descricao?: string;
  valor?: number;
  dataMov?: string;
  idCategoria?: number;
  status?: 'PAGO' | 'PENDENTE';
}

// Tipos para Despesas
export interface Despesa {
  idDespesa: number;
  idUsuario: number;
  idCategoria: number;
  descricao: string;
  valor: number;
  dataMov: string; // ISO date string
  status: 'PAGO' | 'PENDENTE';
}

export interface CreateDespesaRequest {
  descricao: string;
  valor: number;
  dataMov: string;
  idCategoria: number;
  status: 'PAGO' | 'PENDENTE';
}

export interface UpdateDespesaRequest {
  descricao?: string;
  valor?: number;
  dataMov?: string;
  idCategoria?: number;
  status?: 'PAGO' | 'PENDENTE';
}

// Tipos para Metas
export interface Meta {
  idMeta: number;
  descricao: string;
  valorObjetivo: number;
  valorAtual: number;
  dataMeta: string; // ISO date string
  usuario: number;
  status: 'ATIVA' | 'PAUSADA';
  progresso: number;
}

export interface CreateMetaRequest {
  descricao: string;
  valorObjetivo: number;
  dataMeta: string;
}

export interface UpdateMetaRequest {
  descricao?: string;
  valorObjetivo?: number;
  dataMeta?: string;
  status?: 'ATIVA' | 'PAUSADA';
}

export interface ContribuicaoMetaRequest {
  valor: number;
  descricao?: string;
}

export interface HistoricoContribuicao {
  id: number;
  valor: number;
  descricao: string;
  dataContribuicao: string;
  valorAnterior: number;
  valorAtual: number;
  meta: {
    idMeta: number;
    descricao: string;
  };
}

// Tipos para Dashboard
export interface DashboardResumo {
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
  meta: {
    cumpridas: number;
    ativas: number;
    pausadas: number;
    totalValorObjetivo: number;
    totalValorAtual: number;
    progressoMedio: number;
  };
  periodo: {
    mes: number;
    ano: number;
  };
}

export interface GraficoMensal {
  mes: number;
  ano: number;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface GastoPorCategoria {
  categoria: {
    idCategoria: number;
    nome: string;
    cor: string;
  };
  total: number;
  quantidade: number;
  percentual: number;
}

// Tipos genéricos para respostas da API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}