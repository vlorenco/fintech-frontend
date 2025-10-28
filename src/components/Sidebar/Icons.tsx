// Ícones SVG feitos "na mão". Cada um é um componente React.
// Eles usam stroke="currentColor" pra herdar a cor do texto (CSS).

export function DashboardIcon() {
  return (
    <svg
      className="small-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* 4 blocos tipo cards do dashboard */}
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}

export function RecebimentosIcon() {
  return (
    <svg
      className="small-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* círculo externo */}
      <circle cx="12" cy="12" r="9" />
      {/* seta para baixo */}
      <line x1="12" y1="8" x2="12" y2="14" />
      <polyline points="9 12 12 15 15 12" />
    </svg>
  );
}

export function DespesasIcon() {
  return (
    <svg
      className="small-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* círculo externo */}
      <circle cx="12" cy="12" r="9" />
      {/* seta para cima */}
      <line x1="12" y1="16" x2="12" y2="10" />
      <polyline points="9 12 12 9 15 12" />
    </svg>
  );
}

export function MetasIcon() {
  return (
    <svg
      className="small-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* alvo (3 círculos concêntricos) */}
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="currentColor" />
    </svg>
  );
}

export function LogoutIcon() {
  return (
    <svg
      className="small-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* portinha */}
      <rect x="3" y="4" width="11" height="16" rx="2" />
      {/* seta saindo */}
      <polyline points="14 12 21 12" />
      <polyline points="18 9 21 12 18 15" />
    </svg>
  );
}
