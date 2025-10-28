import { useState } from "react";
import StatCard from "../components/Dashboard/StatCard";
import ChartCard from "../components/Dashboard/ChartCard";
import "../components/Dashboard/Dashboard.css";

type DashboardData = {
  totalInvestido: number;
  saldoAtual: number;
  contasMes: number;
  rendaMensal: number;
};

export default function DashboardPage() {
  // Valores mockados só pra exibir na UI.
  // A gente usa useState pra mostrar que sabemos trabalhar com estado.
  const [data] = useState<DashboardData>({
    totalInvestido: 0,
    saldoAtual: 0,
    contasMes: 11218356,
    rendaMensal: 0,
  });

  return (
    <section className="dashboard-page">
      {/* Cabeçalho */}
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Financeiro</h1>
        <p className="dashboard-subtitle">
          Acompanhe suas finanças e investimentos em tempo real
        </p>
      </header>

      {/* Cards de resumo */}
      <div className="stat-row">
        <StatCard
          titulo="Total Investido"
          valor={`R$${data.totalInvestido.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao="+14.3% este mês"
          variacaoCor="positivo"
          iconBg="#7c3aed"
          icon={
            <svg
              width="20"
              height="20"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12l4 4 10-10" />
              <path d="M19 6v4h-4" />
            </svg>
          }
        />

        <StatCard
          titulo="Saldo Atual"
          valor={`R$${data.saldoAtual.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao="+8.2% este mês"
          variacaoCor="positivo"
          iconBg="#06b6d4"
          icon={
            <svg
              width="20"
              height="20"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="14" height="12" rx="2" />
              <line x1="3" y1="10" x2="17" y2="10" />
            </svg>
          }
        />

        <StatCard
          titulo="Contas do Mês"
          valor={`R$${data.contasMes.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao="-2,1% vs mês anterior"
          variacaoCor="negativo"
          iconBg="#ec4899"
          icon={
            <svg
              width="20"
              height="20"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="4" width="12" height="12" rx="2" />
              <line x1="7" y1="10" x2="13" y2="10" />
              <line x1="10" y1="7" x2="10" y2="13" />
            </svg>
          }
        />

        <StatCard
          titulo="Renda Mensal"
          valor={`R$${data.rendaMensal.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao="Estável"
          variacaoCor="neutro"
          iconBg="#10b981"
          icon={
            <svg
              width="20"
              height="20"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="10" y1="3" x2="10" y2="17" />
              <path d="M6 6h5.5a3 3 0 010 6H8" />
              <line x1="10" y1="17" x2="10" y2="19" />
            </svg>
          }
        />
      </div>

      {/* Gráficos fake (somente front) */}
      <div className="charts-row">
        <ChartCard
          titulo="Evolução dos Investimentos"
          subtitulo="Últimos 7 meses"
        >
          <div className="line-chart-wrapper">
            <div className="line-chart-ylabels">
              <span>R$10k</span>
              <span>R$8k</span>
              <span>R$5k</span>
              <span>R$3k</span>
            </div>

            <div className="line-chart-area">
              <div className="line-chart-gradient" />
            </div>
          </div>
        </ChartCard>

        <ChartCard titulo="Gastos Semanais" subtitulo="Este mês">
          <div className="bar-chart-wrapper">
            <div className="bar-chart-header">
              <div className="bar-chart-label">R$3200</div>
            </div>

            <div className="bar-chart-area">
              <div className="bar" style={{ height: "140px" }} />
              <div className="bar" style={{ height: "135px" }} />
              <div className="bar" style={{ height: "145px" }} />
              <div className="bar" style={{ height: "180px" }} />
            </div>
          </div>
        </ChartCard>
      </div>
    </section>
  );
}
