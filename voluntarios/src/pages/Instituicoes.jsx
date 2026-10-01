import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Tabela from '../components/Tabela';

export default function Instituicoes() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
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
    
   
    const objeto = { 
      nome, 
      cnpj, 
      email, 
      telefone 
    };

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
    setCnpj(item.cnpj || '');
    setEmail(item.email);
    setTelefone(item.telefone || '');
    setModalAberto(true);
  }

  function limpar() {
    setIdEditando(null);
    setNome('');
    setCnpj('');
    setEmail('');
    setTelefone('');
    setModalAberto(false);
  }

 
  const colunasTabela = ["Nome", "CNPJ", "E-mail", "Telefone"];
  
 
  const chavesMapeadas = ["nome", "cnpj", "email", "telefone"];

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
          
          <input 
            type="text" 
            placeholder="00.000.000/0001-00" 
            value={cnpj} 
            maxLength={18}
            onChange={e => setCnpj(e.target.value)} 
            required 
            style={{ padding: '8px' }} 
          />

          <input 
            type="email" 
            placeholder="E-mail de Contato" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ padding: '8px' }} 
          />
          
          <input 
            type="text" 
            placeholder="(00) 00000-0000" 
            value={telefone} 
            onChange={e => setTelefone(e.target.value)} 
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
        chaves={chavesMapeadas}
        dados={lista} 
        onEditar={prepararEdicao} 
        onExcluir={excluir} 
      />
    </div>
  );
}
