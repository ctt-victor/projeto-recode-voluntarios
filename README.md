# ODS 4 Social - Plataforma de Gestão de Projetos Educacionais

Aplicação web desenvolvida para apoiar a gestão de projetos sociais voltados ao Objetivo de Desenvolvimento Sustentável 4 (Educação de Qualidade) da ONU. O sistema permite o gerenciamento integrado de instituições parceiras, iniciativas educacionais e participantes.

## Tecnologias Utilizadas

### Back-end
* **Java 21**
* **Spring Boot 3.2.5**
* **Spring Data JPA / Hibernate**
* **MySQL Database**

### Front-end
* **React com Vite**
* **React Router DOM** (Roteamento dinâmico)

---

## Arquitetura do Banco de Dados

O sistema é estruturado em três módulos principais:
* **Instituições:** Cadastro de escolas públicas, ONGs e centros comunitários parceiros.
* **Projetos (Ações Sociais):** Iniciativas educacionais vinculadas às instituições.
* **Participantes:** Cadastro de voluntários e beneficiários das ações.

---

## Como Executar o Projeto

### 1. Configurando o Banco de Dados
Certifique-se de que o MySQL está rodando e execute o script abaixo para criar o banco e as tabelas:

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

CREATE TABLE IF NOT EXISTS participantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    email VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    perfil VARCHAR(50),
    projeto VARCHAR(255)
);
```

### 2. Back-end (Spring Boot)
1. Abra o projeto no **Eclipse IDE** ou na IDE de sua preferência.
2. Certifique-se de que as credenciais do banco no arquivo `src/main/resources/application.properties` estão corretas:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/voluntarios_ods4?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=validate
```
3. Localize a classe principal (`VoluntariosOds4Application.java`), clique com o botão direito e vá em **Run As > Java Application**.
4. O servidor iniciará na porta **8080**.

### 3. Front-end (React)
1. Abra a pasta do front-end no **Visual Studio Code**.
2. Abra o terminal integrado e instale as dependências:
```bash
npm install
```
3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
4. Acesse a aplicação no navegador através do link fornecido pelo Vite (geralmente `http://localhost:5173`).

---

## 🔗 Endpoints Principais da API

* **Instituições:** `GET, POST, PUT, DELETE` -> `http://localhost:8080/instituicoes`
* **Projetos/Ações:** `GET, POST, PUT, DELETE` -> `http://localhost:8080/projetos`
* **Participantes:** `GET, POST, PUT, DELETE` -> `http://localhost:8080/participantes`

---

## Contribuidores
Projeto desenvolvido em parceria com a Recode Pro através do curso de Desenvolvimento Full-Stack e IA e boas práticas de desenvolvimento web.
