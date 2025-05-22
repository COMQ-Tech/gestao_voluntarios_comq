# 🎉 Bem-vindo(a) ao Sistema de Gestão de Voluntários da COMQ!

## 🗂️ Visão Geral do Projeto

Este é um **Sistema de Gestão de Voluntários desenvolvido** em React **Router V7 (framework mode)**, **TypeScript**, **TailwindCSS** e **Firebase**. O objetivo é ajudar líderes e voluntários a organizar e controlar as horas de trabalho.
<br />
<br />

## 🏗️ Principais Componentes & Arquitetura

- **Frontend:**

  - Feito com React + TypeScript
  - Utiliza React Router V7 para navegação.
  - Estilização com TailwindCSS.

- **Backend:**

  - Utiliza Firebase para autenticação e banco de dados em produção.
  - Em desenvolvimento, usa um arquivo `db.json` local para simular o banco.

- **Renderização:**

  - Suporte a Server-side Rendering (SSR) para melhor performance.

- **Build & Deploy:**

Scripts prontos para build (npm run build) e deploy via Docker.
<br />
<br />

## ⚙️ Configuração do Projeto

### 🛠️ Instalação

Primeiro, instale as dependências do projeto:

```bash
npm install
```

### ✅ Rodando o Projeto Localmente

O banco de dados local será um simples arquivo `json`.

1. Crie o arquivo `db.json` na pasta `app/.server/db/`. Esse arquivo não será versionado.
2. Execute o comando abaixo na raiz do projeto:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.
<br />
<br />

## 🚀 Build para Produção

Para gerar a build de produção, execute:

```bash
npm run build
```

<br /><br />

## 🚢 Deployment

### Docker Deployment

Para construir e rodar a aplicação usando Docker:

```bash
docker build -t comq-app .

# Execute o container
docker run -p 3000:3000 comq-app
```

A aplicação containerizada pode ser implantada em qualquer plataforma que suporte Docker, incluindo:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

<br /><br />

## 📝 Convenções e Boas Práticas

### TypeScript

- Sempre utilize **tipos** e **interfaces** para garantir segurança e clareza no código.

### Organização

- Separe **componentes**, **rotas** e **lógica de servidor** em pastas distintas.
- Use nomes **claros** e **descritivos** para arquivos, funções e variáveis.

### Estilização

- Prefira **classes utilitárias** do TailwindCSS.
- Evite **estilos inline**.

### Controle de Versão

- **Não versionar** arquivos sensíveis ou de dados locais (`db.json`, `.env`).
  <br /><br />

---

Construído com ❤️ usando React Router e Firebase. 💻🚀👍
