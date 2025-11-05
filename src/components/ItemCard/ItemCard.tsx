import "./ItemCard.css";
import ActionButton from "../ActionButton/ActionButton";

type ItemCardProps = {
  titulo: string;
  valor: string;
  descricao?: string;
  data: string;
  categoria?: string;
  status?: "pago" | "pendente";
  tipo: "recebimento" | "despesa";
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus?: () => void;
};

export default function ItemCard({
  titulo,
  valor,
  descricao,
  data,
  categoria,
  status,
  tipo,
  onEdit,
  onDelete,
  onToggleStatus,
}: ItemCardProps) {
  const statusColor = status === "pago" ? "#10b981" : "#fb7185";
  const valorColor = tipo === "recebimento" ? "#10b981" : "#fb7185";

  return (
    <div className="item-card">
      <div className="item-card-header">
        <div className="item-card-title-row">
          <h3 className="item-card-title">{titulo}</h3>
          {status && (
            <span
              className="item-card-status"
              style={{ backgroundColor: statusColor }}
            >
              {status === "pago" ? "Pago" : "Pendente"}
            </span>
          )}
        </div>
        <div className="item-card-valor" style={{ color: valorColor }}>
          {valor}
        </div>
      </div>

      {descricao && <p className="item-card-descricao">{descricao}</p>}

      <div className="item-card-meta">
        <span className="item-card-data">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          {data}
        </span>
        {categoria && (
          <span className="item-card-categoria">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
              <line x1="7" y1="7" x2="7.01" y2="7"/>
            </svg>
            {categoria}
          </span>
        )}
      </div>

      <div className="item-card-actions">
        <div className="item-card-actions-left">
          <ActionButton variant="edit" onClick={onEdit} />
          <ActionButton variant="delete" onClick={onDelete} />
        </div>
        {tipo === "despesa" && status === "pendente" && onToggleStatus && (
          <button
            className="item-card-btn item-card-btn-pay"
            onClick={onToggleStatus}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Marcar como Paga
          </button>
        )}
      </div>
    </div>
  );
}
