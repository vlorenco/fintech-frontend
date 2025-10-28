type ActivityItem = {
  titulo: string;
  quando: string;
  valor: string;
  tipo: "in" | "out";
  corDot: string;
};

type RecentActivityProps = {
  itens: ActivityItem[];
};

export default function RecentActivity({ itens }: RecentActivityProps) {
  return (
    <>
      <h2 className="activity-title">Atividade Recente</h2>

      <ul className="activity-list">
        {itens.map((item, idx) => (
          <li key={idx} className="activity-row">
            <div className="activity-left">
              <span
                className="activity-dot"
                style={{ backgroundColor: item.corDot }}
              />
              <div className="activity-texts">
                <div className="activity-main">{item.titulo}</div>
                <div className="activity-time">{item.quando}</div>
              </div>
            </div>

            <div
              className={
                "activity-value " +
                (item.tipo === "in"
                  ? "activity-value-in"
                  : "activity-value-out")
              }
            >
              {item.valor}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
