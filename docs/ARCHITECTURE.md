# Arquitetura do Sistema — PJFin

## Visão Geral

```
+-----------------+         +-----------------+         +-----------------+
|                 |  HTTPS  |                 |   SQL   |                 |
|   React + MUI   | ──────► |    NestJS API   | ──────► |   PostgreSQL    |
|   (Vercel)      |         |   (Render)      |         |   (Render)      |
|                 | ◄────── |                 | ◄────── |                 |
+-----------------+  JSON   +-----------------+  Prisma +-----------------+
```

---

## Frontend

### Stack
- **React 18** + **TypeScript**
- **Vite** — build tool
- **MUI (Material UI)** — component library
- **React Router v6** — roteamento
- **React Query** — server state management
- **Axios** — cliente HTTP
- **Zustand** — estado global (auth, tema)
- **React Hook Form + Zod** — formulários e validação

### Estrutura de Pastas

```
src/
├── assets/
├── components/             # Componentes reutilizáveis
│   ├── layout/             # AppLayout, Sidebar, Topbar
│   └── ui/                 # Button, Modal, Table, Form, Badge, etc.
├── features/               # Módulos organizados por domínio
│   ├── auth/               # Login, Cadastro, RecuperarSenha
│   ├── dashboard/          # DashboardPage, KPICards, Charts
│   ├── transactions/       # TransactionList, TransactionForm, TransactionFilters
│   ├── bills/              # BillsPage, BillCard, BillStatusBadge
│   ├── cashflow/           # CashflowPage, CashflowTable, CashflowChart
│   └── categories/         # CategoryList, CategoryForm
├── hooks/                  # Custom hooks (useAuth, useCompany, etc.)
├── lib/                    # Configurações (axios, queryClient, zod schemas)
├── pages/                  # Páginas roteadas (re-exportam as features)
├── routes/                 # Definição e proteção de rotas
├── store/                  # Zustand stores (auth, company)
├── types/                  # TypeScript types e interfaces globais
└── utils/                  # Formatadores, helpers, constantes
```

---

### Arquitetura de Rotas

As rotas são divididas em dois grupos: **públicas** (acessíveis sem autenticação) e **privadas** (protegidas por `PrivateRoute`, que redireciona para `/login` caso o usuário não esteja autenticado).

```
/                        → redireciona para /dashboard (autenticado) ou /login
│
├── /login               → LoginPage          (pública)
├── /cadastro            → RegisterPage       (pública)
├── /recuperar-senha     → ForgotPasswordPage (pública)
│
└── [PrivateRoute]       → AppLayout (Sidebar + Topbar)
    ├── /dashboard               → DashboardPage
    ├── /transacoes              → TransactionsPage
    ├── /transacoes/nova         → TransactionFormPage
    ├── /transacoes/:id          → TransactionFormPage (edição)
    ├── /contas                  → BillsPage
    ├── /fluxo-de-caixa          → CashflowPage
    ├── /categorias              → CategoriesPage
    ├── /empresa                 → CompanyProfilePage (editar empresa)
    └── /perfil                  → ProfilePage
```

---

### Diagrama de Componentes

```mermaid
graph TD
    App["App (React Router)"]

    App --> PublicRoutes["Rotas Públicas"]
    App --> PrivateRoute["PrivateRoute"]

    PublicRoutes --> LoginPage
    PublicRoutes --> RegisterPage
    PublicRoutes --> ForgotPasswordPage

    PrivateRoute --> AppLayout["AppLayout"]
    AppLayout --> Sidebar
    AppLayout --> Topbar
    AppLayout --> PageContent["Page Content (Outlet)"]

    PageContent --> DashboardPage
    PageContent --> TransactionsPage
    PageContent --> BillsPage
    PageContent --> CashflowPage
    PageContent --> CategoriesPage
    PageContent --> ProfilePage

    DashboardPage --> KPICards["KPICards (Receita, Despesa, Lucro, Caixa)"]
    DashboardPage --> IncomeExpenseChart["IncomeExpenseChart"]
    DashboardPage --> MonthlyEvolutionChart["MonthlyEvolutionChart"]

    TransactionsPage --> TransactionFilters
    TransactionsPage --> TransactionTable
    TransactionsPage --> TransactionFormModal["TransactionFormModal (criar / editar)"]

    BillsPage --> BillFilters["BillFilters (status, vencimento)"]
    BillsPage --> BillTable
    BillsPage --> BillStatusBadge

    CashflowPage --> CashflowTable["CashflowTable (saldo por mês)"]
    CashflowPage --> CashflowChart["CashflowChart (evolução)"]

    CategoriesPage --> CategoryList
    CategoriesPage --> CategoryFormModal["CategoryFormModal (criar / editar)"]
```

---

### Fluxo de Autenticação (Frontend)

```mermaid
sequenceDiagram
    participant U as Usuário
    participant FE as Frontend
    participant Store as Zustand Store
    participant API as NestJS API

    U->>FE: Acessa rota privada
    FE->>Store: Verifica access_token
    alt Token válido
        Store-->>FE: Autorizado
        FE-->>U: Renderiza página
    else Token expirado
        FE->>API: POST /auth/refresh
        API-->>FE: Novo access_token
        FE->>Store: Atualiza token
        FE-->>U: Renderiza página
    else Sem token
        FE-->>U: Redireciona para /login
    end
```

---

## Backend

### Stack

| Pacote | Função |
|---|---|
| NestJS + TypeScript | Framework principal |
| Prisma ORM | Acesso e migrations do banco |
| PostgreSQL | Banco de dados relacional |
| Passport.js + passport-jwt | Estratégias de autenticação |
| @nestjs/jwt | Geração e validação de tokens JWT |
| class-validator + class-transformer | Validação e transformação de DTOs |
| @nestjs/swagger | Documentação automática da API |
| bcrypt | Hash de senhas |

---

### Estrutura de Pastas

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── jwt-refresh.strategy.ts
│   └── dto/
│       ├── login.dto.ts
│       ├── register.dto.ts   # name, last_name, company_name, cnpj, email, password
│       └── forgot-password.dto.ts
│
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
│
├── categories/
│   ├── categories.module.ts
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── dto/
│       ├── create-category.dto.ts
│       └── update-category.dto.ts
│
├── transactions/
│   ├── transactions.module.ts
│   ├── transactions.controller.ts
│   ├── transactions.service.ts
│   └── dto/
│       ├── create-transaction.dto.ts
│       ├── update-transaction.dto.ts
│       └── filter-transaction.dto.ts
│
├── cashflow/
│   ├── cashflow.module.ts
│   ├── cashflow.controller.ts
│   └── cashflow.service.ts
│
├── common/
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── decorators/
│   │   └── current-user.decorator.ts
│   └── filters/
│       └── http-exception.filter.ts
│
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
└── main.ts
```

---

### Responsabilidades de Cada Módulo

#### AuthModule
Gerencia autenticação completa com JWT e Refresh Token.

- `POST /auth/register` — cria usuário e empresa (campos: nome, sobrenome, nome da empresa, CNPJ, e-mail, senha)
- `POST /auth/login` — retorna `access_token` + `refresh_token`
- `POST /auth/refresh` — renova o `access_token`
- `POST /auth/logout` — invalida o `refresh_token`

Dependências: `UsersModule`, `PrismaModule`, `JwtModule`

---

#### UsersModule
Gerencia o perfil do usuário autenticado.

- `GET /users/me` — retorna dados do usuário logado
- `PATCH /users/me` — atualiza nome e senha

Dependências: `PrismaModule`

---

#### CategoriesModule
Gerencia categorias financeiras por empresa.

- `GET /categories` — lista categorias da empresa ativa
- `POST /categories` — cria categoria
- `PATCH /categories/:id` — atualiza categoria
- `DELETE /categories/:id` — remove categoria

Dependências: `PrismaModule`

---

#### TransactionsModule
Módulo central. Gerencia entradas, saídas e contas a pagar/receber.

- `GET /transactions` — lista com filtros (tipo, status, período, categoria)
- `POST /transactions` — cria transação
- `GET /transactions/:id` — busca por ID
- `PATCH /transactions/:id` — atualiza transação
- `DELETE /transactions/:id` — remove transação

Dependências: `PrismaModule`, `CategoriesModule`

---

#### CashflowModule
Calcula e retorna o fluxo de caixa mensal agregando transações.

- `GET /cashflow` — retorna saldo inicial, entradas, saídas e saldo final por mês

Dependências: `PrismaModule`, `TransactionsModule`

---

#### PrismaModule
Módulo global que expõe o `PrismaService` para todos os outros módulos.

---

### Diagrama de Módulos NestJS

```mermaid
graph TD
    Main["main.ts (bootstrap)"] --> AppModule

    AppModule --> AuthModule
    AppModule --> UsersModule
    AppModule --> CategoriesModule
    AppModule --> TransactionsModule
    AppModule --> CashflowModule
    AppModule --> PrismaModule

    AuthModule --> PrismaModule
    AuthModule --> UsersModule
    AuthModule --> JwtModule["JwtModule (@nestjs/jwt)"]

    UsersModule --> PrismaModule

    CategoriesModule --> PrismaModule

    TransactionsModule --> PrismaModule
    TransactionsModule --> CategoriesModule

    CashflowModule --> PrismaModule
    CashflowModule --> TransactionsModule

    AuthModule --> JwtGuard["JwtAuthGuard (common/guards)"]
    JwtGuard -.protege.-> UsersModule
    JwtGuard -.protege.-> CategoriesModule
    JwtGuard -.protege.-> TransactionsModule
    JwtGuard -.protege.-> CashflowModule
```

---

### Fluxo de uma Requisição Autenticada

```mermaid
sequenceDiagram
    participant C as Cliente (Frontend)
    participant G as JwtAuthGuard
    participant CT as Controller
    participant S as Service
    participant P as PrismaService
    participant DB as PostgreSQL

    C->>G: HTTP Request + Bearer Token
    G->>G: Valida JWT
    alt Token inválido
        G-->>C: 401 Unauthorized
    else Token válido
        G->>CT: Passa request com usuário injetado
        CT->>CT: Valida DTO (class-validator)
        CT->>S: Chama método do Service
        S->>P: Query via Prisma
        P->>DB: SQL
        DB-->>P: Resultado
        P-->>S: Dados
        S-->>CT: Resposta processada
        CT-->>C: HTTP Response (JSON)
    end
```

---

## Banco de Dados

### Entidades e Atributos

---

#### User
Representa o usuário do sistema. Cada usuário possui exatamente uma empresa.

| Coluna | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| first_name | VARCHAR | Nome |
| last_name | VARCHAR | Sobrenome |
| email | VARCHAR | E-mail único |
| password_hash | VARCHAR | Senha criptografada |
| company_id | UUID | FK para Company (1:1) |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

---

#### Company
Representa a empresa do usuário, criada no momento do cadastro.

| Coluna | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| name | VARCHAR | Nome da empresa |
| cnpj | VARCHAR | CNPJ único |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

---

#### Category
Categorias financeiras criadas por empresa para classificar transações.

| Coluna | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| company_id | UUID | FK para Company |
| name | VARCHAR | Nome da categoria |
| type | ENUM | income, expense |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

---

#### Transaction
Entidade central do sistema. Representa entradas, saídas, contas a pagar e contas a receber — tudo é uma transação com atributos que definem seu comportamento.

| Coluna | Tipo | Descrição |
|---|---|---|
| id | UUID | Chave primária |
| company_id | UUID | FK para Company |
| category_id | UUID | FK para Category |
| type | ENUM | income, expense |
| amount | DECIMAL(10,2) | Valor da transação |
| date | DATE | Data de competência |
| due_date | DATE | Data de vencimento (nullable) |
| status | ENUM | paid, pending, overdue |
| payment_method | ENUM | pix, boleto, credit_card, debit_card, cash, transfer |
| contact_name | VARCHAR | Nome do cliente ou fornecedor (texto livre, nullable) |
| description | TEXT | Observação livre (nullable) |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data de atualização |

---

### Relações entre Entidades

```
User         ────── Company      (1:1)
Company      ──────< Category    (1:N)
Company      ──────< Transaction (1:N)
Category     ──────< Transaction (1:N)
```

---

### Diagrama ER

```mermaid
erDiagram
    User {
        uuid id PK
        varchar first_name
        varchar last_name
        varchar email
        varchar password_hash
        uuid company_id FK
        timestamp created_at
        timestamp updated_at
    }

    Company {
        uuid id PK
        varchar name
        varchar cnpj
        timestamp created_at
        timestamp updated_at
    }

    Category {
        uuid id PK
        uuid company_id FK
        varchar name
        enum type
        timestamp created_at
        timestamp updated_at
    }

    Transaction {
        uuid id PK
        uuid company_id FK
        uuid category_id FK
        enum type
        decimal amount
        date date
        date due_date
        enum status
        enum payment_method
        varchar contact_name
        text description
        timestamp created_at
        timestamp updated_at
    }

    User ||--|| Company : "possui"
    Company ||--o{ Category : "possui"
    Company ||--o{ Transaction : "possui"
    Category ||--o{ Transaction : "classifica"
```

---

## Autenticação

1. Usuário faz login — backend valida credenciais
2. Backend retorna `access_token` (15min) + `refresh_token` (7 dias)
3. Frontend armazena tokens no `localStorage`
4. A cada request, `access_token` é enviado no header `Authorization: Bearer`
5. Quando expirado, frontend usa `refresh_token` para obter novo par de tokens

---

## Deploy

| Serviço | Plataforma | Observação |
|---|---|---|
| Frontend | Vercel | Deploy automático via GitHub |
| Backend | Render | Docker container |
| Banco de Dados | Render | PostgreSQL gerenciado |

---

## Fluxos Principais do Sistema

---

### 1. Cadastro e Onboarding

```mermaid
flowchart TD
    A([Usuário acessa o sistema]) --> B[Tela de Cadastro]
    B --> C[Preenche nome, sobrenome, nome da empresa, CNPJ, e-mail, senha e confirmação de senha]
    C --> D{Dados válidos?}
    D -- Não --> E[Exibe erros de validação nos campos]
    E --> C
    D -- Sim --> F[POST /auth/register]
    F --> G[Backend cria usuário]
    G --> H[Backend cria empresa vinculada ao usuário]
    H --> I[Gera access_token + refresh_token]
    I --> J([Redireciona para o Dashboard])
```

---

### 2. Autenticação — Login e Refresh

```mermaid
flowchart TD
    A([Usuário acessa rota privada]) --> B{Tem access_token?}
    B -- Não --> C([Redireciona para /login])
    B -- Sim --> D{Token válido?}
    D -- Sim --> E([Renderiza a página])
    D -- Não/Expirado --> F{Tem refresh_token?}
    F -- Não --> C
    F -- Sim --> G[POST /auth/refresh]
    G --> H{Refresh válido?}
    H -- Não --> C
    H -- Sim --> I[Atualiza access_token no store]
    I --> E
```

---

### 3. Registro de Transação

```mermaid
flowchart TD
    A([Usuário clica em Nova Transação]) --> B[Abre TransactionFormModal]
    B --> C[Preenche tipo, valor, data, categoria]
    C --> D[Informa forma de pagamento]
    D --> E[Informa status: pago ou pendente]
    E --> F{É conta a pagar/receber?}
    F -- Sim --> G[Informa data de vencimento]
    F -- Não --> H[Submete formulário]
    G --> H
    H --> I{Dados válidos?}
    I -- Não --> J[Exibe erros nos campos]
    J --> C
    I -- Sim --> K[POST /transactions]
    K --> L[Atualiza lista de transações]
    L --> M([Fecha modal — transação registrada])
```

---

### 4. Visualização do Dashboard

```mermaid
flowchart TD
    A([Usuário acessa /dashboard]) --> B[Frontend busca dados]
    B --> C[GET /dashboard/summary]
    B --> D[GET /cashflow]
    C --> E[Renderiza KPICards]
    D --> F[Renderiza gráficos]
    E --> G{Há contas vencendo?}
    G -- Sim --> H[Exibe alerta de contas próximas do vencimento]
    G -- Não --> I([Dashboard carregado])
    H --> I
    F --> I
```

---

### 5. Gestão de Contas a Pagar e Receber

```mermaid
flowchart TD
    A([Usuário acessa /contas]) --> B[GET /transactions com filtro due_date + status pending]
    B --> C[Lista contas pendentes]
    C --> D{Usuário seleciona uma conta}
    D --> E[Clica em Marcar como pago]
    E --> F[PATCH /transactions/:id com status: paid]
    F --> G[Atualiza status na lista]
    G --> H([Conta marcada como paga])
```

---

### 6. Fluxo de Caixa Mensal

```mermaid
flowchart TD
    A([Usuário acessa /fluxo-de-caixa]) --> B[Seleciona mês de referência]
    B --> C[GET /cashflow?month=YYYY-MM]
    C --> D[Backend agrega transações do período]
    D --> E[Calcula saldo inicial, entradas, saídas e saldo final]
    E --> F[Retorna dados para o frontend]
    F --> G[Renderiza CashflowTable]
    F --> H[Renderiza CashflowChart]
    G --> I([Fluxo de caixa exibido])
    H --> I
```
