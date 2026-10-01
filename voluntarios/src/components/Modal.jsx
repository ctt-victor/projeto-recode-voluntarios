export default function Modal({ isOpen, onClose, children }) {
 
  if (!isOpen) return null;

  
  const handleFundoClick = (e) => {
    if (e.target.id === 'modal-container') {
      onClose();
    }
  };

  return (
    <div 
      id="modal-container"
      onClick={handleFundoClick}
      style={{
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
      }}
    >
      <div style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '16px',
        width: '400px',
        maxWidth: '90%',
        boxShadow: '0 4px 8px rgba(168, 159, 159, 0.2)',
        position: 'relative'
      }}>
        {}
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

        {}
        <div style={{ marginTop: '10px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
