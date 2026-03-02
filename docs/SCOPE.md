# PJFin — Escopo Oficial do Produto

## Objetivo do MVP

Criar um SaaS financeiro B2B funcional, capaz de:

> Permitir que MEIs e pequenas empresas controlem completamente sua vida financeira, com visão clara de caixa, lucro e organização.

---

## MVP — Funcionalidades Essenciais (Versão 1.0)

Essas são as funcionalidades mínimas para colocar o PJFin em produção real.

---

### 1. Autenticacao & Usuarios

**Cadastro — campos obrigatórios:**
- [ ] Nome
- [ ] Sobrenome
- [ ] Nome da empresa
- [ ] CNPJ
- [ ] E-mail
- [ ] Senha
- [ ] Confirmar senha

**Demais funcionalidades:**
- [ ] Login
- [ ] Logout
- [ ] Recuperação de senha
- [ ] Token JWT + Refresh Token
- [ ] Perfil do usuário

---

### 2. Empresa (PJ)

Cada usuário possui exatamente uma empresa, criada no momento do cadastro.

- [ ] Editar dados da empresa

**Campos:**
- Nome da empresa
- CNPJ

---

### 3. Categorias Financeiras

- [ ] CRUD de categorias
- [ ] Tipos: `Receita` | `Despesa`

**Exemplos:**

| Tipo | Categorias |
|---|---|
| Receita | Serviços, Produtos |
| Despesa | Aluguel, Internet, Energia |

---

### 4. Entradas (Receitas)

- [ ] Valor
- [ ] Data
- [ ] Categoria
- [ ] Cliente *(opcional)*
- [ ] Forma de pagamento
- [ ] Observação

---

### 5. Saídas (Despesas)

- [ ] Valor
- [ ] Data
- [ ] Categoria
- [ ] Fornecedor *(opcional)*
- [ ] Forma de pagamento
- [ ] Observação

---

### 6. Contas a Pagar e Receber

- [ ] Valor
- [ ] Vencimento
- [ ] Status: `Pendente` | `Pago`
- [ ] Relacionamento com Entrada / Saída

---

### 7. Fluxo de Caixa Mensal

- [ ] Saldo inicial
- [ ] Total de entradas
- [ ] Total de saídas
- [ ] Saldo final
- [ ] Visualização por mês

---

### 8. Dashboard Financeiro

**KPIs principais:**
- [ ] Receita mensal
- [ ] Despesa mensal
- [ ] Lucro
- [ ] Fluxo de caixa

**Gráficos:**
- [ ] Entradas x Saídas
- [ ] Evolução mensal

---

## Funcionalidades Avancadas (Versão 2.0)

Essas elevam o PJFin para nível SaaS premium.

---

### Inteligência Financeira

- [ ] Projeções futuras
- [ ] Previsão de caixa
- [ ] Metas financeiras
- [ ] Simulações: *Quanto preciso faturar para X de lucro?*

---

### Relatórios Profissionais

- [ ] PDF mensal
- [ ] Relatório anual
- [ ] Exportação CSV / Excel

---

### Alertas & Lembretes

- [ ] Contas a pagar vencendo
- [ ] Meta não atingida
- [ ] Caixa crítico

---

### Integracoes (futuro)

- [ ] Open Finance
- [ ] Pix
- [ ] APIs bancárias

---

## Arquitetura Funcional — Visão Geral

```
Usuário
   ↓
Auth → Empresa → Financeiro → Dashboard → Relatórios
```

---

## Critério de Sucesso do MVP

Em menos de **2 minutos**, o usuário deve conseguir:

1. Criar conta e empresa em um único formulário
2. Inserir receitas e despesas
3. Visualizar lucro, fluxo de caixa e dashboard

---

## Escopo Fechado do MVP

| Módulo | Status |
|---|---|
| Login / Autenticação | No escopo |
| Empresas | No escopo |
| Categorias | No escopo |
| Entradas (Receitas) | No escopo |
| Saídas (Despesas) | No escopo |
| Contas a Pagar / Receber | No escopo |
| Fluxo de Caixa | No escopo |
| Dashboard | No escopo |
