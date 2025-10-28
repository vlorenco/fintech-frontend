type StatCardProps = {
  titulo: string;
  valor: string;
  variacao: string;
  variacaoCor: "positivo" | "negativo" | "neutro";
  iconBg: string; // cor de fundo do quadradinho do ícone
  icon: React.ReactNode; // svg passado pronto
};

export default function StatCard({
  titulo,
  valor,
  variacao,
  variacaoCor,
  iconBg,
  icon,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-label">{titulo}</div>

        <div
          className="stat-icon"
          style={{
            backgroundColor: iconBg,
          }}
        >
          {icon}
        </div>
      </div>

      <div className="stat-value">{valor}</div>

      <div
        className={
          "stat-variation " +
          (variacaoCor === "positivo"
            ? "stat-variation-positive"
            : variacaoCor === "negativo"
            ? "stat-variation-negative"
            : "stat-variation-neutral")
        }
      >
        {variacao}
      </div>
    </div>
  );
}
