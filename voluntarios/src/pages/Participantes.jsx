import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Tabela from '../components/Tabela';

export default function Participantes() {
  const [lista, setLista] = useState([]);
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [perfil, setPerfil] = useState('');
  const [projeto, setProjeto] = useState('');
  const [idEditando, setIdEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const URL = 'http://localhost:8080/participantes';

  useEffect(() => {
    buscarParticipantes();
  }, []);

  async function buscarParticipantes() {
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
    const objeto = { nome, cpf, email, data_nascimento: dataNascimento, telefone, perfil, projeto };

    const metodo = idEditando ? 'PUT' : 'POST';
    const endpoint = idEditando ? `${URL}/${idEditando}` : URL;

    try {
      await fetch(endpoint, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objeto)
      });
      limpar();
      buscarParticipantes();
    } catch (erro) {
      console.log("Erro ao salvar:", erro);
    }
  }

  async function excluir(id) {
    if (confirm("Tem certeza que deseja excluir?")) {
      try {
        await fetch(`${URL}/${id}`, { method: 'DELETE' });
        buscarParticipantes();
      } catch (erro) {
        console.log("Erro ao excluir:", erro);
      }
    }
  }

  function prepararEdicao(item) {
    setIdEditando(item.id);
    setNome(item.nome);
    setCpf(item.cpf);
    setEmail(item.email);
    setDataNascimento(item.data_nascimento || '');
    setTelefone(item.telefone || '');
    setPerfil(item.perfil);
    setProjeto(item.projeto || '');
    setModalAberto(true);
  }

  function limpar() {
    setIdEditando(null);
    setNome('');
    setCpf('');
    setEmail('');
    setDataNascimento('');
    setTelefone('');
    setPerfil('');
    setProjeto('');
    setModalAberto(false);
  }

  const colunasTabela = ["Nome", "CPF", "E-mail", "Nascimento", "Telefone", "Perfil", "Projeto"];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Gerenciar Participantes</h2>

      <button 
        onClick={() => { limpar(); setModalAberto(true); }} 
        style={{ marginBottom: '10px', padding: '10px 15px', background: '#27ae60', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
      >
        + Novo Participante
      </button>

      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <h3>{idEditando ? 'Editar Participante' : 'Cadastrar Participante'}</h3>
        
        <form onSubmit={salvar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          <input 
            type="text" 
            placeholder="Nome Completo" 
            value={nome} 
            onChange={e => setNome(e.target.value)} 
            required 
            style={{ padding: '8px' }} 
          />
          
          <input 
            type="text" 
            placeholder="11122233344" 
            value={cpf} 
            maxLength={14} 
            onChange={e => {
              if (e.target.value.length <= 14) {
                setCpf(e.target.value);
              }
            }} 
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
          
          <input 
            type="date" 
            value={dataNascimento} 
            onChange={e => setDataNascimento(e.target.value)} 
            style={{ padding: '8px' }} 
          />
          
          <input 
            type="text" 
            placeholder="Telefone" 
            value={telefone} 
            onChange={e => setTelefone(e.target.value)} 
            style={{ padding: '8px' }} 
          />
          
          <select 
            value={perfil} 
            onChange={e => setPerfil(e.target.value)} 
            required 
            style={{ padding: '8px' }}
          >
            <option value="">Selecione o Perfil</option>
            <option value="Coordenador">Coordenador</option>
            <option value="Voluntário">Voluntário</option>
            <option value="Aluno">Aluno</option>
          </select>

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