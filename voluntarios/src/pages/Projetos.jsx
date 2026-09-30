import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Tabela from '../components/Tabela';

export default function Projetos() {
  const [lista, setLista] = useState([]);
  const [listaInstituicoes, setListaInstituicoes] = useState([]);
  
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cpfCoordenador, setCpfCoordenador] = useState('');
  const [email, setEmail] = useState('');
  const [instituicao, setInstituicao] = useState('');
  const [vagasDisponiveis, setVagasDisponiveis] = useState('');
  const [idEditando, setIdEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  const URL_PROJETOS = 'http://localhost:8080/projetos';
  const URL_INSTITUICOES = 'http://localhost:8080/instituicoes';

  useEffect(() => {
    buscarProjetos();
    buscarInstituicoes();
  }, []);

  async function buscarProjetos() {
    try {
      const resposta = await fetch(URL_PROJETOS);
      const dados = await resposta.json();
      setLista(dados);
    } catch (erro) {
      console.log("Erro ao buscar projetos:", erro);
    }
  }

  async function buscarInstituicoes() {
    try {
      const resposta = await fetch(URL_INSTITUICOES);
      const dados = await resposta.json();
      setListaInstituicoes(dados);
    } catch (erro) {
      console.log("Erro ao buscar instituições para o select:", erro);
    }
  }

  async function salvar(evento) {
    evento.preventDefault();
    
    if (Number(vagasDisponiveis) < 0) {
      alert("O número de vagas não pode ser negativo!");
      return;
    }

    // Objeto ajustado com os nomes exatos esperados pelo Java (camelCase)
    const objeto = {
      titulo,
      descricao,
      cpfCoordenador,
      email,
      instituicao,
      vagasDisponiveis: Number(vagasDisponiveis)
    };

    const metodo = idEditando ? 'PUT' : 'POST';
    const endpoint = idEditando ? `${URL_PROJETOS}/${idEditando}` : URL_PROJETOS;

    try {
      await fetch(endpoint, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(objeto)
      });
      limpar();
      buscarProjetos();
    } catch (erro) {
      console.log("Erro ao salvar:", erro);
    }
  }

  async function excluir(id) {
    if (confirm("Tem certeza que deseja excluir?")) {
      try {
        await fetch(`${URL_PROJETOS}/${id}`, { method: 'DELETE' });
        buscarProjetos();
      } catch (erro) {
        console.log("Erro ao excluir:", erro);
      }
    }
  }

  function prepararEdicao(item) {
    setIdEditando(item.id);
    setTitulo(item.titulo);
    setDescricao(item.descricao || '');
    // Ajustado para ler as propriedades corretas do back-end
    setCpfCoordenador(item.cpfCoordenador);
    setEmail(item.email);
    setInstituicao(item.instituicao);
    setVagasDisponiveis(item.vagasDisponiveis);
    setModalAberto(true);
  }

  function limpar() {
    setIdEditando(null);
    setTitulo('');
    setDescricao('');
    setCpfCoordenador('');
    setEmail('');
    setInstituicao('');
    setVagasDisponiveis('');
    setModalAberto(false);
  }

  const colunasTabela = ["Título", "Descrição", "CPF Coordenador", "E-mail", "Instituição", "Vagas"];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Gerenciar Projetos Sociais</h2>

      <button 
        onClick={() => { limpar(); setModalAberto(true); }} 
        style={{ marginBottom: '10px', padding: '10px 15px', background: '#27ae60', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
      >
        + Novo Projeto
      </button>

      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <h3>{idEditando ? 'Editar Projeto' : 'Cadastrar Projeto'}</h3>
        
        <form onSubmit={salvar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          <input 
            type="text" 
            placeholder="Título do Projeto" 
            value={titulo} 
            onChange={e => setTitulo(e.target.value)} 
            required 
            style={{ padding: '8px' }} 
          />
          
          <textarea 
            placeholder="Descrição" 
            value={descricao} 
            onChange={e => setDescricao(e.target.value)} 
            rows="3" 
            style={{ padding: '8px' }} 
          />
          
          <input 
            type="text" 
            placeholder="CPF do Coordenador" 
            value={cpfCoordenador} 
            maxLength={14}
            onChange={e => {
              if (e.target.value.length <= 14) {
                setCpfCoordenador(e.target.value);
              }
            }} 
            required 
            style={{ padding: '8px' }} 
          />
          
          <input 
            type="email" 
            placeholder="E-mail do Projeto" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            style={{ padding: '8px' }} 
          />
          
          <select 
            value={instituicao} 
            onChange={e => setInstituicao(e.target.value)} 
            required 
            style={{ padding: '8px' }}
          >
            <option value="">Selecione a Instituição Responsável</option>
            {listaInstituicoes.map(inst => (
              <option key={inst.id} value={inst.nome}>
                {inst.nome}
              </option>
            ))}
          </select>
          
          <input 
            type="number" 
            placeholder="Vagas Disponíveis" 
            value={vagasDisponiveis} 
            min="0" 
            onChange={e => {
              const valor = e.target.value;
              if (valor >= 0 || valor === '') {
                setVagasDisponiveis(valor);
              }
            }} 
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