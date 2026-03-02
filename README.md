<h1 align="center">💰 PJFin</h1>
<p align="center">
  <b>SaaS Financeiro B2B para gestão de finanças de pequenas empresas e profissionais autônomos.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow" />
  <img src="https://img.shields.io/badge/stack-React%20%7C%20NestJS%20%7C%20PostgreSQL-blue" />
  <img src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## 📌 Sobre o Projeto

O **PJFin** é uma plataforma SaaS financeira B2B desenvolvida para ajudar pequenas empresas e profissionais autônomos a controlarem suas finanças com eficiência. O sistema oferece controle de entradas e saídas, fluxo de caixa, contas a pagar/receber e dashboards com indicadores financeiros em tempo real.

## 🚀 Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Frontend | React + TypeScript + Vite + MUI |
| Backend | NestJS + TypeScript |
| Banco de Dados | PostgreSQL + Prisma ORM |
| Autenticação | JWT + Refresh Token |
| Infra | Docker + Docker Compose |
| Deploy | Vercel (FE) · Railway (BE) · Neon (DB) |

## 🗂 Estrutura do Projeto

```
pjfin/
├── docs/          # Documentação técnica
├── frontend/      # Aplicação React
├── backend/       # API NestJS
└── docker/        # Configuração de infraestrutura
```

## ⚡ Como Rodar Localmente

### Pré-requisitos
- Node.js 18+
- Docker e Docker Compose

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/pjfin.git
cd pjfin
```

### 2. Suba a infraestrutura
```bash
cd docker
docker-compose up -d
```

### 3. Configure e rode o backend
```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npm run start:dev
```

### 4. Configure e rode o frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

O app estará disponível em `http://localhost:5173`

## 📚 Documentação

- [Escopo do Projeto](docs/SCOPE.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Documentação da API](docs/API.md)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
