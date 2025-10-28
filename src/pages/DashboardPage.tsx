import { useState } from "react";
import "../components/Dashboard/Dashboard.css";
import StatCard from "../components/Dashboard/StatCard";
import ChartCard from "../components/Dashboard/ChartCard";
import RecentActivity from "../components/Dashboard/RecentActivity";

type DashboardData = {
  totalInvestido: number;
  saldoAtual: number;
  contasMes: number;
  rendaMensal: number;
};

type ActivityItem = {
  titulo: string;
  quando: string;
  valor: string;
  tipo: "in" | "out";
  corDot: string;
};

export default function DashboardPage() {
  const [data] = useState<DashboardData>({
    totalInvestido: 0,
    saldoAtual: 0,
    contasMes: 11218356,
    rendaMensal: 0,
  });

  const [atividades] = useState<ActivityItem[]>([
    {
      titulo: "Investimento em AAPL",
      quando: "2 horas atrás",
      valor: "+R$2.500,00",
      tipo: "in",
      corDot: "#c084fc",
    },
    {
      titulo: "Dividendos recebidos",
      quando: "1 dia atrás",
      valor: "+R$180,50",
      tipo: "in",
      corDot: "#4ade80",
    },
    {
      titulo: "Pagamento Netflix",
      quando: "3 dias atrás",
      valor: "-R$15,99",
      tipo: "out",
      corDot: "#fb7185",
    },
    {
      titulo: "Conta de luz paga",
      quando: "5 dias atrás",
      valor: "-R$180,50",
      tipo: "out",
      corDot: "#fb7185",
    },
  ]);

  return (
    <section className="dashboard-page">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard Financeiro</h1>
        <p className="dashboard-subtitle">
          Acompanhe suas finanças e investimentos em tempo real
        </p>
      </header>

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

      <div className="charts-row">
        <div className="activity-card">
          <RecentActivity itens={atividades} />
        </div>

        <ChartCard titulo="Gastos Semanais" subtitulo="Este mês">
          <div className="chart-simple">
            <div className="chart-left-scale">
              <span>R$3400</span>
              <span>R$2550</span>
              <span>R$1700</span>
              <span>R$850</span>
              <span>R$0</span>
            </div>

            <div className="chart-bars-area">
              <div className="chart-bar-col">
                <div className="chart-bar chart-bar-h1" />
                <span className="chart-bar-label">Week 1</span>
              </div>

              <div className="chart-bar-col">
                <div className="chart-bar chart-bar-h2" />
                <span className="chart-bar-label">Week 2</span>
              </div>

              <div className="chart-bar-col">
                <div className="chart-bar chart-bar-h3" />
                <span className="chart-bar-label">Week 3</span>
              </div>

              <div className="chart-bar-col">
                <div className="chart-bar chart-bar-h4" />
                <span className="chart-bar-label">Week 4</span>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>
    </section>
  );
}
