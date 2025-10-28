type ChartCardProps = {
  titulo: string;
  subtitulo: string;
  children: React.ReactNode;
};

export default function ChartCard({ titulo, subtitulo, children }: ChartCardProps) {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div className="chart-title">{titulo}</div>
        <div className="chart-subtitle">{subtitulo}</div>
      </div>

      <div className="chart-body">{children}</div>
    </div>
  );
}
