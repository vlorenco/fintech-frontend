import api from "./api";
import type { DashboardResumo, GraficoMensal, GastoPorCategoria } from "../types";

export const dashboardService = {
  // GET /api/dashboard/resumo?mes=MM&ano=YYYY (opcional)
  getResumo: async (mes?: number, ano?: number): Promise<DashboardResumo> => {
    const params = mes && ano ? { mes, ano } : undefined;
    const { data } = await api.get("/dashboard/resumo", { params });
    return data;
  },

  // GET /api/dashboard/grafico-mensal?ano=YYYY&meses=N (opcional)
  getGraficoMensal: async (opts?: { ano?: number; meses?: number }): Promise<GraficoMensal[]> => {
    const { data } = await api.get("/dashboard/grafico-mensal", { params: opts });
    return data;
  },

  // GET /api/dashboard/gastos-categoria?mes=MM&ano=YYYY&tipo=despesas|receitas (opcional)
  getGastosPorCategoria: async (opts?: {
    mes?: number; ano?: number; tipo?: "despesas" | "receitas";
  }): Promise<GastoPorCategoria[]> => {
    const { data } = await api.get("/dashboard/gastos-categoria", { params: opts });
    return data;
  },
};
