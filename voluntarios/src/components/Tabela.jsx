export default function Tabela({ colunas, dados, onEditar, onExcluir }) {
  return (
    <div style={{ overflowX: 'auto', marginTop: '20px' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '6px',
        overflow: 'hidden',
        fontFamily: 'Arial, sans-serif'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#e2e6eb', color: '#363535', textAlign: 'left' }}>
            {colunas.map((coluna, index) => (
              <th key={index} style={{ padding: '12px 15px' }}>{coluna}</th>
            ))}
            <th style={{ padding: '12px 15px', textAlign: 'center' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.length === 0 ? (
            <tr>
              <td colSpan={colunas.length + 1} style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d' }}>
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : (
            dados.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e0e0e0', transition: 'background 0.2s' }}>
                {/* Preenche as colunas dinamicamente baseado nas chaves do objeto */}
                {Object.keys(item).map((chave, i) => {
                  if (chave === 'id') return null; // Não exibe o ID na tabela
                  return (
                    <td key={i} style={{ padding: '12px 15px', color: '#333' }}>
                      {item[chave]}
                    </td>
                  );
                })}
                
                {/* Botões de Ação */}
                <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                  <button 
                    onClick={() => onEditar(item)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#f39c12',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '6px'
                    }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => onExcluir(item.id)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}