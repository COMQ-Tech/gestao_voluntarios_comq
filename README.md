# 🎉 Bem-vindo(a) ao Sistema de Gestão de Voluntários da COMQ!

Esta aplicação FullStack foi desenvolvida utilizando React Router V7 em framework mode, com o objetivo de auxiliar Líderes de Grupos de Trabalho e Voluntários na organização e controle das horas trabalhadas.

## 🚀 Tecnologias Utilizadas

- 🌐 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling e otimização
- 🔄 Carregamento e mutações de dados
- 🔒 TypeScript por padrão
- 🎨 TailwindCSS para estilização
- 🔥 Firebase para autenticação e banco de dados
- 📖 [Documentação do React Router](https://reactrouter.com/)

---

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

---

## 🚀 Build para Produção

Para gerar a build de produção, execute:

```bash
npm run build
```

---

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

---

### Deployment DIY (Faça Você Mesmo)

Se você já tem experiência com o deploy de aplicações Node.js, o servidor embutido está pronto para produção.

Certifique-se de enviar a pasta `build/` gerada pelo comando `npm run build`:

```
├── package.json
├── package-lock.json (ou pnpm-lock.yaml, ou bun.lockb)
├── build/
│   ├── client/    # Arquivos estáticos
│   └── server/    # Código do servidor
```

---

## 🎨 Estilização

Este projeto já vem configurado com o [Tailwind CSS](https://tailwindcss.com/), mas você pode optar por qualquer framework CSS que preferir.

---

Construído com ❤️ usando React Router e Firebase. 💻🚀👍

---
