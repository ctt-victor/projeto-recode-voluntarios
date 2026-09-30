import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Tabela from '../components/Tabela';

export default function Instituicoes() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState(''); // Agora usa select
  const [responsavel, setResponsavel] = useState('');
  const [email, setEmail] = useState('');
  const [idEditando, setIdEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const URL = 'http://localhost:8080/instituicoes';

  useEffect(() => {
    buscarInstituicoes();
  }, []);

  async function buscarInstituicoes() {
    try {
      const resposta = await fetch(URL);
      const dados = await resposta.json();
      setLista(dados);
    } catch (erro) {
      console.log("Erro ao buscar:", erro);
    }
  }

  async function salvar(evento) {
    evento.preventDefault();
    const objeto = { nome, tipo, responsavel, email };

    const metodo = idEditando ? 'PUT' : 'POST';
    const endpoint = idEditando ? `${URL}/${idEditando}` : URL;

    try {
      await fetch(endpoint, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objeto)
      });
      limpar();
      buscarInstituicoes();
    } catch (erro) {
      console.log("Erro ao salvar:", erro);
    }
  }

  async function excluir(id) {
    if (confirm("Tem certeza que deseja excluir?")) {
      try {
        await fetch(`${URL}/${id}`, { method: 'DELETE' });
        buscarInstituicoes();
      } catch (erro) {
        console.log("Erro ao excluir:", erro);
      }
    }
  }

  function prepararEdicao(item) {
    setIdEditando(item.id);
    setNome(item.nome);
    setTipo(item.tipo);
    setResponsavel(item.responsavel);
    setEmail(item.email);
    setModalAberto(true);
  }

  function limpar() {
    setIdEditando(null);
    setNome('');
    setTipo('');
    setResponsavel('');
    setEmail('');
    setModalAberto(false);
  }

  const colunasTabela = ["Nome", "Tipo", "Responsável", "E-mail"];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Gerenciar Instituições</h2>

      <button 
        onClick={() => { limpar(); setModalAberto(true); }} 
        style={{ marginBottom: '10px', padding: '10px 15px', background: '#27ae60', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
      >
        + Nova Instituição
      </button>

      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <h3>{idEditando ? 'Editar Instituição' : 'Cadastrar Instituição'}</h3>
        
        <form onSubmit={salvar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          <input 
            type="text" 
            placeholder="Nome da Instituição" 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
            required 
            style={{ padding: '8px' }} 
          />
          
          {/* Select para o tipo de Instituição */}
          <select 
            value={tipo} 
            onChange={e => setTipo(e.target.value)} 
            required 
            style={{ padding: '8px' }}
          >
            <option value="">Selecione o Tipo</option>
            <option value="Escola">Escola</option>
            <option value="ONG">ONG</option>
            <option value="Fundação">Fundação</option>
            <option value="Associação">Associação</option>
          </select>

          <input 
            type="text" 
            placeholder="Responsável" 
            value={responsavel} 
            onChange={e => setResponsavel(e.target.value)} 
            required 
            style={{ padding: '8px' }} 
          />
          
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ padding: '8px' }} 
          />

          <button type="submit" style={{ padding: '10px', background: '#2980b9', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            {idEditando ? 'Atualizar' : 'Salvar'}
          </button>
        </form>
      </Modal>

      <Tabela 
        colunas={colunasTabela} 
        dados={lista} 
        onEditar={prepararEdicao} 
        onExcluir={excluir} 
      />
    </div>
  );
}