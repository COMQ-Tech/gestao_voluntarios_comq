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

#### Desenvolvimento Básico

```bash
npm run dev
```

#### Ambientes Específicos

Para diferentes ambientes de desenvolvimento:

```bash
# Ambiente local
npm run dev:local

# Ambiente de staging
npm run dev:staging
```

> **Nota para usuários Windows**: Se você encontrar problemas com os comandos de ambiente, instale o `cross-env`:
>
> ```bash
> npm install --save-dev cross-env
> ```
>
> E atualize os scripts no `package.json` para usar `cross-env ENV=local` ao invés de `env ENV=local`.

### 📁 Configuração do Banco Local

1. Crie o arquivo `db.json` na pasta `app/.server/db/`. Esse arquivo não será versionado.
2. A aplicação estará disponível em `http://localhost:5173`.

<br />
<br />

## 🚀 Scripts Disponíveis

| Script                | Descrição                            |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Inicia o servidor de desenvolvimento |
| `npm run dev:local`   | Inicia com ENV=local                 |
| `npm run dev:staging` | Inicia com ENV=staging               |
| `npm run build`       | Gera build de produção               |
| `npm run start`       | Inicia o servidor de produção        |
| `npm run typecheck`   | Verifica tipos TypeScript            |

<br /><br />

## 🚀 Build para Produção

Para gerar a build de produção, execute:

```bash
npm run build
```

Para iniciar o servidor de produção:

```bash
npm run start
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

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React** (^19.1.0) - Biblioteca de interface
- **React Router** (^7.5.3) - Roteamento e framework
- **TypeScript** (^5.8.3) - Tipagem estática
- **TailwindCSS** (^4.1.4) - Framework CSS

### Backend

- **Firebase** (^11.7.1) - Banco de dados e autenticação
- **Firebase Admin** (^13.3.0) - SDK administrativo
- **Node.js** - Runtime do servidor

### Build & Dev Tools

- **Vite** (^6.3.3) - Bundler e dev server
- **@react-router/dev** - Ferramentas de desenvolvimento

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

## 🔧 Solução de Problemas

### Problemas com Variáveis de Ambiente (Windows)

Se você estiver no Windows e encontrar problemas com os scripts `dev:local` ou `dev:staging`, instale o `cross-env`:

```bash
npm install --save-dev cross-env
```

Depois atualize os scripts no `package.json`:

```json
{
  "scripts": {
    "dev:local": "cross-env ENV=local react-router dev",
    "dev:staging": "cross-env ENV=staging react-router dev"
  }
}
```

### Problemas de Porta

Se a porta 5173 estiver ocupada, o Vite automaticamente tentará usar a próxima porta disponível.

<br /><br />

---

Construído com ❤️ usando React Router e Firebase. 💻🚀👍
