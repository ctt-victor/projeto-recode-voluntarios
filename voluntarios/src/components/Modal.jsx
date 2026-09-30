export default function Modal({ isOpen, onClose, children }) {
  // Se o modal não estiver aberto, não renderiza nada na tela
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '16px',
        width: '400px',
        maxWidth: '90%',
        boxShadow: '0 4px 8px rgba(168, 159, 159, 0.2)',
        position: 'relative'
      }}>
        {/* Botão de Fechar */}
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          &times;
        </button>

        {/* Conteúdo dinâmico que for colocado dentro do Modal */}
        <div style={{ marginTop: '10px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}