// Ícones SVG como componentes React
interface IconProps {
  className?: string;
}

export function DashboardIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function RecebimentosIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2V6M6.414 6.414L9.172 9.172M2 12H6M6.414 17.586L9.172 14.828M12 18V22M17.586 17.586L14.828 14.828M22 12H18M17.586 6.414L14.828 9.172" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

export function DespesasIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M17 3C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4V20C18 20.2652 17.8946 20.5196 17.7071 20.7071C17.5196 20.8946 17.2652 21 17 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H17ZM16 5H4V19H16V5ZM14 7V9H6V7H14ZM12 11V13H6V11H12Z" fill="currentColor"/>
    </svg>
  );
}

export function MetasIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  );
}

export function CategoriasIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="13" y="13" width="8" height="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
