# Technical Requirements: COMQ Volunteer Management System

## Tech Stack

- **Frontend**: React 19, TypeScript, React Router v7 (framework mode)
- **Styling**: TailwindCSS 4
- **Backend/DB**: Firebase (Auth & Firestore in production), local db.json for development
- **Build Tool**: Vite 6
- **SSR**: Enabled by default (can be switched to SPA)
- **Containerization**: Docker (Node 20 Alpine)

## Architecture

- Modular file structure: separate folders for components, routes, server logic, and config
- Uses React Router's loader/action pattern for data fetching and mutations
- Server-side rendering for performance and SEO
- Environment-based config (local, staging, production)

## Deployment

- Dockerized for cloud deployment (AWS ECS, Google Cloud Run, etc.)
- Scripts for build, dev, and type checking
- Production build served via Node.js

## Dev Practices

- TypeScript strict mode
- Use of interfaces/types for all data models
- Utility-first CSS (Tailwind)
- No sensitive files (db.json, .env) in version control
- Conventional commits for versioning
