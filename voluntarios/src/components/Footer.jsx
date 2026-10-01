export default function Footer() {
  return (
    <footer style={{ 
      textAlign: 'center', 
      padding: '20px 10px', 
      background: '#f8f9fa', 
      borderTop: '1px solid #e9ecef',
      marginTop: 'auto', // Ajuda a fixar no fim da página junto com o flexbox do App.jsx
      color: '#6c757d',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px'
    }}>
      <p style={{ margin: '0 0 5px 0' }}>
        &copy; 2026 <strong>ConectaAção</strong> - Todos os direitos reservados.
      </p>
      <p style={{ margin: 0, fontSize: '12px', color: '#95a5a6' }}>
        Apoiando o <strong>ODS 4 da ONU</strong>: Educação de Qualidade.
      </p>
    </footer>
  );
}
