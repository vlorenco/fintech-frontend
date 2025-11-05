import "./ActionButton.css";

type ActionButtonProps = {
  onClick: () => void;
  variant: "edit" | "delete" | "pause" | "reactivate" | "contribute";
  disabled?: boolean;
};

const buttonConfig = {
  edit: {
    label: "Editar",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    ),
    className: "action-btn-edit"
  },
  delete: {
    label: "Excluir",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      </svg>
    ),
    className: "action-btn-delete"
  },
  pause: {
    label: "Pausar",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="6" y="4" width="4" height="16"/>
        <rect x="14" y="4" width="4" height="16"/>
      </svg>
    ),
    className: "action-btn-pause"
  },
  reactivate: {
    label: "Reativar",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    ),
    className: "action-btn-reactivate"
  },
  contribute: {
    label: "Contribuir",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19"/>
        <line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    ),
    className: "action-btn-contribute"
  }
};

export default function ActionButton({ onClick, variant, disabled = false }: ActionButtonProps) {
  const config = buttonConfig[variant];

  return (
    <button 
      className={`action-btn ${config.className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {config.icon}
      {config.label}
    </button>
  );
}
