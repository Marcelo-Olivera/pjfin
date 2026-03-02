# 📡 Documentação da API — PJFin

Base URL: `https://api.pjfin.com.br/v1`

> A documentação interativa (Swagger) estará disponível em `/api/docs` quando o backend estiver rodando.

---

## Autenticação

Todas as rotas protegidas exigem o header:
```
Authorization: Bearer <access_token>
```

---

## Endpoints

### 🔐 Auth

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/register` | Registrar empresa e usuário admin |
| POST | `/auth/login` | Login e retorno de tokens |
| POST | `/auth/refresh` | Renovar access token |
| POST | `/auth/logout` | Invalidar refresh token |

---

### 👤 Usuários

| Método | Rota | Descrição |
|---|---|---|
| GET | `/users` | Listar usuários da empresa |
| POST | `/users` | Criar usuário |
| GET | `/users/:id` | Buscar usuário por ID |
| PATCH | `/users/:id` | Atualizar usuário |
| DELETE | `/users/:id` | Remover usuário |

---

### 🏢 Empresas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/companies/me` | Dados da empresa logada |
| PATCH | `/companies/me` | Atualizar dados da empresa |

---

### 🏷 Categorias

| Método | Rota | Descrição |
|---|---|---|
| GET | `/categories` | Listar categorias |
| POST | `/categories` | Criar categoria |
| PATCH | `/categories/:id` | Atualizar categoria |
| DELETE | `/categories/:id` | Remover categoria |

---

### 💸 Transações

| Método | Rota | Descrição |
|---|---|---|
| GET | `/transactions` | Listar transações (com filtros) |
| POST | `/transactions` | Criar transação |
| GET | `/transactions/:id` | Buscar por ID |
| PATCH | `/transactions/:id` | Atualizar transação |
| DELETE | `/transactions/:id` | Remover transação |

**Query params:** `?type=income|expense&startDate=&endDate=&categoryId=`

---

### 📊 Dashboard

| Método | Rota | Descrição |
|---|---|---|
| GET | `/dashboard/summary` | Saldo, entradas e saídas do período |
| GET | `/dashboard/cashflow` | Fluxo de caixa mensal |
| GET | `/dashboard/kpis` | Indicadores financeiros |

---

### 📄 Relatórios

| Método | Rota | Descrição |
|---|---|---|
| GET | `/reports/pdf` | Gerar relatório em PDF |
| GET | `/reports/csv` | Exportar dados em CSV |
