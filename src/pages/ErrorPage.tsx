export default function ErrorPage() {
  return (
    
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f172a',
      color: '#f1f5f9',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
        
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <div style={{ marginBottom: '2rem' }}>
             <img 
            src="/images/logo.png" 
            alt="Fintech" 
            className="login-logo"
          />
          <div style={{
            fontSize: '6rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            404
          </div>
          
        </div>
        
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 1rem 0'
        }}>
          Página não encontrada
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#94a3b8',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button 
            style={{
              background: 'linear-gradient(90deg, #7c3aed, #06b6d4)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.875rem 1.5rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
            onClick={() => window.location.href = '/dashboard'}
          >
            Ir para Dashboard
          </button>
          
        </div>
      </div>
    </div>
  );
}
