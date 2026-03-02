# PJFin — Backend

API NestJS do PJFin.

## Stack

- NestJS + TypeScript
- Prisma ORM
- PostgreSQL
- JWT + Passport.js
- Swagger (documentação automática)

## Como rodar

```bash
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

API disponível em: `http://localhost:3000`
Swagger em: `http://localhost:3000/api/docs`

## Scripts

```bash
npm run start:dev   # Desenvolvimento (watch)
npm run start:prod  # Produção
npm run build       # Build
npm run test        # Testes unitários
npm run test:e2e    # Testes e2e
```
