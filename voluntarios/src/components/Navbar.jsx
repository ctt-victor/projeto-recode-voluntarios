import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '15px', background: '#4590db', color: '#fff', alignItems: 'center' }}>
      <h2 style={{ margin: 0 }}>ConectaAção</h2>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Instituições</Link>
        <Link to="/projetos" style={{ color: '#fff', textDecoration: 'none' }}>Projetos</Link>
        <Link to="/voluntarios" style={{ color: '#fff', textDecoration: 'none' }}>Voluntários</Link>
      </div>
    </nav>
  );
}