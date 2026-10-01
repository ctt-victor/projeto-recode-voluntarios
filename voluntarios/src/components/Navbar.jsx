import { Link } from 'react-router-dom';

export default function Navbar() {

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '5px 10px',
    borderRadius: '4px',
    transition: 'background 0.2s, color 0.2s'
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px', 
      background: '#2980b9',
      color: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ margin: 0, fontWeight: 'bold', letterSpacing: '0.5px' }}>ConectaAção</h2>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/" style={linkStyle}>Instituições</Link>
        <Link to="/projetos" style={linkStyle}>Projetos</Link>
        <Link to="/voluntarios" style={linkStyle}>Voluntários</Link>
      </div>
    </nav>
  );
}
