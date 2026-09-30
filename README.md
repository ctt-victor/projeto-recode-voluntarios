Markdown
# ODS 4 Social - Plataforma de Gestão de Projetos Educacionais

Aplicação web desenvolvida para apoiar a gestão de projetos sociais voltados ao **Objetivo de Desenvolvimento Sustentável 4 (Educação de Qualidade)** da ONU. O sistema permite o gerenciamento integrado de instituições parceiras, iniciativas educacionais e participantes.

---

## Tecnologias Utilizadas

### Back-end
* **Java 21**
* **Spring Boot 3.2.5**
* **Spring Data JPA / Hibernate**
* **MySQL Database**

### Front-end
* **React** com **Vite**
* **React Router DOM** (Roteamento dinâmico)

---

## Arquitetura do Banco de Dados
O sistema é estruturado em três módulos principais:
1. **Instituições:** Cadastro de escolas públicas, ONGs e centros comunitários parceiros.
2. **Projetos:** Iniciativas educacionais vinculadas às instituições.
3. **Participantes:** Cadastro de voluntários e beneficiários das ações.

---

Como Executar o Projeto

1. Configurando o Banco de Dados
Certifique-se de que o MySQL está rodando e crie o banco de dados:
```sql

CREATE DATABASE IF NOT EXISTS voluntarios_ods4;
USE voluntarios_ods4;

CREATE TABLE IF NOT EXISTS instituicoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS acoes_sociais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    cpf_coordenador VARCHAR(14) NOT NULL,
    email VARCHAR(255) NOT NULL,
    instituicao VARCHAR(255) NOT NULL,
    vagas_disponiveis INT NOT NULL
);
2. Back-end (Spring Boot)
Abra o projeto no Eclipse IDE.

Certifique-se de que as credenciais do banco no arquivo src/main/resources/application.properties estão corretas:

Properties
spring.datasource.url=jdbc:mysql://localhost:3306/voluntarios_ods4?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
Localize a classe principal (VoluntariosOds4Application.java), clique com o botão direito e vá em Run As > Java Application.

O servidor iniciará na porta 8080.

3. Front-end (React)
Abra a pasta do front-end no Visual Studio Code.

Abra o terminal integrado e instale as dependências (caso ainda não tenha feito):

Bash
npm install
Inicie o servidor de desenvolvimento:

Bash
npm run dev
Acesse a aplicação no navegador através do link fornecido pelo Vite (geralmente http://localhost:5173).

Endpoints Principais da API
Instituições: http://localhost:8080/instituicoes
Ações Sociais: http://localhost:8080/acoes

Contribuidores
Projeto desenvolvido com foco em integração full-stack e boas práticas de desenvolvimento web.
