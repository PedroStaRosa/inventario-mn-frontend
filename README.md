# 🎨 Inventário MN – Frontend

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Interface web moderna e intuitiva para gerenciamento completo de inventário empresarial**

[Instalação](#-instalação) • [Configuração](#-configuração) • [Features](#-features-principais) • [Arquitetura](#-arquitetura)

</div>

---

## 📖 Sobre o Projeto

Sistema web desenvolvido em **Next.js** com **TypeScript** para gerenciamento completo de inventário empresarial. O frontend consome a API REST existente, oferecendo interface moderna e intuitiva para controle de estoque físico, criação de inventários (manual e via CSV), análise de divergências e sugestões inteligentes de produtos a inventariar.

### 🎯 Funcionalidades Principais

- **Autenticação completa** com JWT e proteção de rotas
- **Gestão de produtos** com CRUD completo e importação CSV
- **Sistema de inventários** com criação manual e importação em lote
- **Visualização de dados** com cards, tabelas e gráficos
- **Sugestões inteligentes** de produtos para inventariar
- **Histórico completo** de inventários por produto
- **Interface responsiva** e acessível

---

## ✨ Features Principais

### 🔐 Autenticação & Segurança
- ✅ Sistema completo de registro e login
- ✅ Gerenciamento de token JWT (localStorage/cookies)
- ✅ Proteção de rotas com middleware
- ✅ Refresh token automático
- ✅ Logout seguro

### 📦 Gestão de Produtos
- ✅ Listagem de produtos com busca e filtros
- ✅ Criação individual de produtos
- ✅ Importação em massa via CSV com preview
- ✅ Validação completa de formulários
- ✅ Tratamento de erros específicos

### 📋 Sistema de Inventário
- ✅ Listagem de inventários com cards visuais
- ✅ Visualização detalhada de inventários
- ✅ Criação manual com múltiplos produtos
- ✅ Importação via CSV com validação
- ✅ Cálculo automático de divergências
- ✅ Sugestões inteligentes de produtos
- ✅ Histórico completo por produto
- ✅ Deletar inventário com confirmação

### 🎨 Interface & UX
- ✅ Design moderno e responsivo
- ✅ Componentes reutilizáveis (Table, Modal, Toast)
- ✅ Loading states e skeletons
- ✅ Sistema de notificações/toasts
- ✅ Tratamento de erros global
- ✅ Acessibilidade (ARIA, navegação por teclado)
- ✅ Animações suaves

---

## 🛠️ Tecnologias e Ferramentas

### Core
- **Next.js** 15+ - Framework React com SSR/SSG
- **TypeScript** 5.9 - Tipagem estática
- **React** 19+ - Biblioteca UI

### Estilização
- **Tailwind CSS** 3.0 - Framework CSS utility-first
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **CSS Modules** - Estilos modulares (opcional)

### Validação & Formulários
- **Zod** 4.3 - Validação de schemas
- **react-hook-form** - Gerenciamento de formulários
- **@hookform/resolvers** - Integração Zod + react-hook-form

### Requisições HTTP
- **Axios** ou **fetch nativo** - Cliente HTTP com interceptors
- **React Query** ou **SWR** - Cache e sincronização de dados

### Estado Global
- **Zustand** ou **Context API** - Gerenciamento de estado UI
- **React Query** - Estado de dados da API

### Testes
- **Vitest** - Framework de testes unitários
- **React Testing Library** - Testes de componentes
- **Playwright** - Testes E2E (opcional)

### Ferramentas de Desenvolvimento
- **ESLint** - Linter de código
- **Prettier** - Formatador de código
- **TypeScript** - Verificação de tipos

---

## 🏗️ Arquitetura

O projeto segue uma **arquitetura em camadas** com separação clara de responsabilidades:

```
┌─────────────┐
│   Pages     │  ← Páginas Next.js (app router)
└──────┬──────┘
       ↓
┌─────────────┐
│   Actions   │  ← Server Actions (validação server-side)
└──────┬──────┘
       ↓
┌─────────────┐
│  Services   │  ← Lógica de negócio e chamadas à API
└──────┬──────┘
       ↓
┌─────────────┐
│  API Client │  ← Cliente HTTP com interceptors
└──────┬──────┘
       ↓
┌─────────────┐
│   Backend   │  ← API REST
└─────────────┘
```

### Características da Arquitetura:

- **Separação de Responsabilidades**: Cada camada tem uma responsabilidade específica
- **Reutilização**: Services podem ser reutilizados por diferentes pages/actions
- **Type Safety**: TypeScript em todas as camadas
- **Validação Dupla**: Zod no cliente e server-side
- **Manutenibilidade**: Código organizado por módulos de funcionalidade

### 📂 Estrutura de Pastas

```
front-end_mundonovo_inventory/
├── app/                      # App Router do Next.js
│   ├── (auth)/              # Grupo de rotas de autenticação
│   │   ├── login/
│   │   └── register/
│   ├── products/            # Páginas de produtos
│   │   ├── page.tsx         # Listagem
│   │   └── components/      # Componentes específicos
│   ├── inventories/         # Páginas de inventários
│   │   ├── page.tsx         # Listagem
│   │   ├── [id]/            # Detalhes
│   │   ├── create/          # Criação manual
│   │   └── import/          # Importação CSV
│   ├── actions/             # Server Actions
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   └── inventory.ts
│   ├── layout.tsx           # Layout principal
│   └── error.tsx           # Página de erro global
├── components/              # Componentes React
│   ├── ui/                  # Componentes base (shadcn/ui)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   └── Toast.tsx
│   ├── inventory/           # Componentes de inventário
│   │   ├── InventoryCard.tsx
│   │   ├── InventoryItemsTable.tsx
│   │   └── ProductSelector.tsx
│   └── ErrorBoundary.tsx    # Tratamento de erros
├── lib/                     # Bibliotecas e utilitários
│   ├── api/                 # Cliente API
│   │   └── client.ts        # Axios/fetch com interceptors
│   ├── services/            # Serviços de negócio
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   └── inventory.ts
│   ├── schemas/             # Schemas Zod
│   │   ├── user.ts
│   │   ├── product.ts
│   │   └── inventory.ts
│   ├── hooks/               # Hooks customizados
│   │   ├── useAuth.ts
│   │   └── useNotifications.ts
│   └── utils/               # Funções auxiliares
├── contexts/                # Contextos React
│   └── NotificationContext.tsx
├── types/                    # Tipos TypeScript
│   └── api.ts               # Tipos de respostas da API
├── middleware.ts            # Middleware Next.js (proteção de rotas)
├── .env.local               # Variáveis de ambiente
└── package.json
```

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** ou **yarn** ou **pnpm** (gerenciador de pacotes)
- **Git** (para clonar o repositório)
- **Backend API** rodando (consulte [README do Backend](https://github.com/PedroStaRosa/inventario-mn-api/blob/main/README.md)

---

## 🚀 Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/seu-usuario/inventario-mn-frontend.git
cd inventario-mn-frontend
```

### 2️⃣ Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
# URL da API Backend
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Ambiente
NODE_ENV=development
```

> 💡 **Nota:** Certifique-se de que o backend está rodando e acessível na URL configurada.

### 4️⃣ Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🔧 Configuração

### Scripts Disponíveis

```bash
npm run dev          # Inicia em desenvolvimento (hot-reload)
npm run build        # Build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
npm test             # Executa testes
```

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL base da API Backend | `http://localhost:3000/api/v1` |
| `NODE_ENV` | Ambiente de execução | `development` ou `production` |


## 📚 Estrutura de Desenvolvimento

O projeto está organizado em **6 sprints de 1 semana** cada:

### Sprint 1 — Setup e Autenticação ✅
- Setup do projeto Next.js
- Configuração de API Client
- Sistema de autenticação completo
- Páginas de login e registro
- Layout base

### Sprint 2 — Gestão de Produtos
- CRUD completo de produtos
- Importação CSV
- Componentes reutilizáveis (Table, Modal, Toast)

### Sprint 3 — Gestão de Inventários (Parte 1)
- Listagem e visualização de inventários
- Histórico por produto
- Componentes de visualização

### Sprint 4 — Gestão de Inventários (Parte 2)
- Criação manual de inventários
- Importação CSV de inventários
- Seleção de produtos com busca

### Sprint 5 — Funcionalidades Avançadas
- Sistema de notificações
- Tratamento de erros global
- Loading states
- Melhorias de UX e acessibilidade

### Sprint 6 — Polimento e Deploy
- Testes unitários e E2E
- Documentação completa
- Ajustes finais
- Configuração de deploy

---

## 🎨 Componentes Principais

### Componentes de UI Base
- **Button** - Botão reutilizável com variantes
- **Input** - Campo de entrada com validação
- **Modal** - Diálogo modal reutilizável
- **Table** - Tabela com ordenação e paginação
- **Toast** - Notificações toast
- **LoadingSkeleton** - Placeholder de carregamento

### Componentes de Inventário
- **InventoryCard** - Card de resumo de inventário
- **InventoryItemsTable** - Tabela de itens do inventário
- **ProductSelector** - Seletor de produtos com busca
- **DifferenceBadge** - Badge para destacar divergências
- **SuggestedProducts** - Lista de produtos sugeridos

---

## 🔌 Integração com API

### Autenticação

O frontend consome a API REST do backend. Todos os endpoints protegidos requerem token JWT:

```typescript
// Exemplo de requisição autenticada
const response = await apiClient.get('/products', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

### Endpoints Principais

#### Autenticação
- `POST /api/v1/user` - Criar usuário
- `POST /api/v1/auth` - Login
- `POST /api/v1/auth/refresh` - Renovar token

#### Produtos
- `GET /api/v1/products` - Listar produtos
- `POST /api/v1/products` - Criar produto
- `POST /api/v1/products/import` - Importar CSV

#### Inventários
- `GET /api/v1/inventories` - Listar inventários
- `GET /api/v1/inventory?id={uuid}` - Buscar por ID
- `GET /api/v1/inventory/suggested` - Sugestões
- `GET /api/v1/inventory/product?id={uuid}` - Histórico por produto
- `POST /api/v1/inventory` - Criar manualmente
- `POST /api/v1/inventory/import` - Importar CSV
- `DELETE /api/v1/inventory?id={uuid}` - Deletar

> 📖 Para documentação completa da API, consulte o [README do Backend](https://github.com/PedroStaRosa/inventario-mn-api/blob/main/README.md)

---

## 🛡️ Segurança

- ✅ **Autenticação JWT** - Tokens seguros armazenados
- ✅ **Proteção de Rotas** - Middleware Next.js
- ✅ **Validação de Dados** - Zod no cliente e server-side
- ✅ **HTTPS** - Recomendado para produção
- ✅ **CORS** - Configurado no backend
- ✅ **Sanitização** - Proteção contra XSS

---

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes com coverage
npm run test:coverage

# Testes E2E (Playwright)
npm run test:e2e
```

> ⚠️ **Em desenvolvimento:** Configuração de testes será implementada na Sprint 6.

---

## 🚀 Deploy

### Build de Produção

```bash
# Gerar build otimizado
npm run build

# Iniciar servidor de produção
npm run start
```

### Variáveis de Ambiente para Produção

```bash
NEXT_PUBLIC_API_URL=https://api.seudominio.com/api/v1
NODE_ENV=production
```

### Plataformas Recomendadas

- **Vercel** - Deploy otimizado para Next.js
- **Netlify** - Deploy com CI/CD
- **Railway** - Deploy simples e rápido
- **AWS Amplify** - Deploy na AWS

### Docker (Opcional)

```dockerfile
# Dockerfile será criado na Sprint 6
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

---

## 📖 Documentação Adicional

- 📕 [README Backend](https://github.com/PedroStaRosa/inventario-mn-api/blob/main/README.md) - Documentação da API

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature
   ```bash
   git checkout -b feature/minha-feature
   ```
3. **Commit** suas mudanças seguindo [Conventional Commits](https://www.conventionalcommits.org/)
   ```bash
   git commit -m 'feat: adiciona nova feature'
   ```
4. **Push** para a branch
   ```bash
   git push origin feature/minha-feature
   ```
5. Abra um **Pull Request**

### Padrões de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação, espaços, etc
- `refactor:` Refatoração de código
- `test:` Adição de testes
- `chore:` Tarefas de build, configuração, etc

### Estratégia de Branches

- **main** - Branch principal (sempre estável)
- **feature/** - Novas funcionalidades
- **fix/** - Correções de bugs
- **refactor/** - Refatorações
- **chore/** - Tarefas de infraestrutura

---

## 📝 Licença

Este projeto está sob a licença **ISC**.

---

## 👨‍💻 Autor

Desenvolvido com ❤️ para otimizar processos de inventário empresarial.

---

## 🔗 Links Úteis

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev/
- **TypeScript Docs**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Zod**: https://zod.dev/
- **React Hook Form**: https://react-hook-form.com/
- **shadcn/ui**: https://ui.shadcn.com/

---

## 🌟 Mostre seu apoio

Se este projeto foi útil, considere dar uma ⭐ no repositório!

---

**Última atualização:** Fevereiro 2026  
**Versão:** 1.0.0
