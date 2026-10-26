# Auditoria de Conformidade com as Regras — inventory-mn

**Data:** 2026-08-20  
**Regras analisadas:** `project-rules.mdc`, `project-stack.mdc`  
**Escopo:** árvore completa de `src/` + configuração do projeto (`package.json`, `next.config.ts`, Tailwind/CSS, `components.json`)

---

## Veredito

O código **bate em grande parte com `project-stack.mdc`** (Next 16, React 19, Tailwind 4, shadcn/Radix, Zod, Server Actions, cookies seguros).

A conformidade com **`project-rules.mdc` é mista**: App Router, `_components` colocados, services e formulários com Zod estão bem; porém várias regras estruturais e de política não são atendidas (sem camada `data-access`, sem AuthJS, sem testes, sem `/hooks`, validação Zod incompleta no servidor e alguns client components grandes demais).

Há também **conflitos internos entre os dois arquivos de regras** que devem ser resolvidos antes de tratar cada lacuna como defeito de código (ver [Conflitos entre arquivos .mdc](#conflitos-entre-arquivos-mdc)).

---

## O que já está em conformidade

### `project-stack.mdc`

| Regra | Evidência |
| --- | --- |
| Next.js 16.2.9 + React 19.2.4 + TypeScript strict | `package.json`, `tsconfig.json` |
| ESLint via `eslint` (não `next lint`) | `"lint": "eslint"` |
| React Compiler habilitado | `next.config.ts` → `reactCompiler: true` |
| `cookies()` / `params` assíncronos | `src/lib/auth.ts`, `inventory/[id]/page.tsx`, `inventory/product/[id]/page.tsx` |
| Server Components por padrão; `"use client"` para interatividade | Páginas/layouts em sua maioria RSC async; formulários/tabelas/UI primitives são client |
| Mutações via Server Actions | `app/auth/_actions`, `app/dashboard/_actions` |
| JWT/cookies no servidor; `httpOnly` + `sameSite: "strict"` + `secure` em prod | `src/lib/auth.ts` |
| Tailwind 4 com config em CSS; sem `tailwind.config.js` | `globals.css`, `postcss.config.mjs` |
| Tokens OKLCH + `@theme inline` + `tw-animate-css` | `src/app/globals.css` |
| shadcn + imports unificados de `radix-ui` | `components.json`, `src/components/ui/*` |
| Zod + RHF + `zodResolver` nos formulários | login, produto, import CSV, sugestão de inventário |
| PapaParse via helper compartilhado | `src/lib/parseCsvFile.ts` |
| Alias de path `@/*` → `src/*` | `tsconfig.json` |
| Sonner para toasts (ligado no layout raiz) | `src/app/layout.tsx` + `components/ui/sonner.tsx` |
| Assinatura Next 16 de `revalidateTag(tag, profile)` | `productActions.ts` usa `revalidateTag("dashboard", "max")` |

### `project-rules.mdc`

| Regra | Evidência |
| --- | --- |
| Roteamento file-based do App Router | `src/app/**` |
| Lógica de negócio em grande parte fora da UI | `src/services/**`, `src/lib/**`, `src/schemas/**` |
| Colocação de `_components` no nível da página | dashboard, inventory, products, help, auth/login |
| UI compartilhada em `src/components` | `ui/`, `navs/`, `headers/`, `logoutButton`, `loadingOverlay` |
| Preferência por Server Components | páginas de lista/detalhe buscam em RSC e passam props para tabelas client |
| Composição Shadcn + Radix | `src/components/ui/*` |
| Tipos TypeScript para domínio/API | `src/types/**` |
| Apenas componentes funcionais | nenhum class component encontrado |
| Tailwind em vez de estilos inline | quase nenhum uso de `style={{}}` |
| Zod para validação de input (client + algumas actions) | schemas + login/`newProductAction` |
| Cookies seguros / flags orientadas a CSRF | `sameSite: "strict"` em `auth.ts` |
| Config da URL da API via env | `NEXT_PUBLIC_API_URL` em `apiClient.ts` |

---

## Lacunas e mudanças necessárias

Agrupadas por prioridade. Cada item indica a origem da regra e os arquivos/organização a alterar.

### P0 — Correção / segurança / integridade da stack

#### 1. Server Actions sem revalidação Zod

**Regras:** stack — “Validate again in Server Actions”; project-rules — Input Validation  

| Action | Problema | Correção sugerida |
| --- | --- | --- |
| `createInventoryAction` | Faz `JSON.parse` + cast; sem Zod | Validar com `inventoryCsvSchema` (ou schema dedicado de itens) antes de chamar o service |
| `createManyProductAction` | Mesmo padrão para payload CSV de produtos | Validar cada linha com `productSchema` / schema de array |
| `getSuggestInventoryAction` | Checagens manuais com `Number.isNaN`; ignora `suggestInventorySchema` | `suggestInventorySchema.safeParse({ days, limit })` |

**Arquivos:**  
- `src/app/dashboard/_actions/inventoryAction.ts`  
- `src/app/dashboard/_actions/productActions.ts`

Também remover `console.log` de debug dessas actions (e services relacionados) para prontidão de produção.

#### 2. Estratégia de auth conflita com `project-rules.mdc`

**Regra:** “Use AuthJS 5 for manage autentication.”  

**Atual:** fluxo customizado de cookie JWT (`jsonwebtoken` + `src/lib/auth.ts` + user services). Isso **bate com `project-stack.mdc`**, não com AuthJS.

**Escolher uma opção:**

- **A (recomendada para este repo):** atualizar `project-rules.mdc` para documentar a auth JWT com cookies (já protegida com httpOnly).  
- **B:** migrar para AuthJS 5 e remover/substituir os helpers de cookie JWT — mudança grande em `auth.ts`, login action, services e guards de layout.

Enquanto a regra não for atualizada, tratar AuthJS como **dívida de documentação**, não como feature incompleta.

#### 3. Credenciais de desenvolvimento expostas no bundle do client

**Regras:** Environment Variables / nunca expor secrets no frontend  

**Arquivo:** `src/app/auth/login/_components/loginForm.tsx`  

Usa `NEXT_PUBLIC_DEV_LOGIN_EMAIL` / `NEXT_PUBLIC_DEV_LOGIN_PASSWORD`. Tudo com prefixo `NEXT_PUBLIC_*` vai para o browser.

**Correção:** remover autofill via env pública, ou usar mecanismo só de servidor que nunca prefixe secrets com `NEXT_PUBLIC_`. Preferir defaults vazios em builds de produção.

#### 4. Linhas do CSV sem validação Zod após PapaParse

**Regra:** stack — “validate rows with Zod after parse”  

**Arquivo:** `src/lib/parseCsvFile.ts`  

Headers são checados; campos das linhas são mapeados com casts/`|| "UN"` sem schema.

**Correção:** após o mapeamento, rodar `productSchema.safeParse` (ou schema de item de inventário) por linha e coletar/reportar erros antes do `resolve`.

---

### P1 — Estrutura / organização vs `project-rules.mdc`

#### 5. Diretórios `data-access` ausentes

**Regra:** pastas DAL por módulo, como `app/dashboard/.../data-access`  

**Atual:** acesso a dados em `src/services/{user,product,inventory,dashboard}` global; páginas/actions chamam services diretamente.

**Opções:**

- **Alinhar o código às regras:** criar `data-access/` no nível da rota que encapsula services (ou mover as funções de fetch para lá), mantendo Server Actions finas em `_actions`.  
- **Alinhar as regras ao código:** documentar `src/services` como DAL e remover a obrigatoriedade de `data-access` por rota.

Estrutura recomendada se mantiver a regra escrita:

```text
app/dashboard/
  _actions/          # já existe
  data-access/       # falta — queries usadas pelas páginas do dashboard
app/dashboard/products/
  _actions/          # split opcional a partir de dashboard/_actions
  data-access/
app/dashboard/inventory/
  _actions/
  data-access/
app/auth/
  _actions/          # já existe
  data-access/
```

#### 6. Actions colocadas na raiz da seção, nem sempre por feature

**Atual:** todas as actions de produto/inventário em `app/dashboard/_actions/`  

**Exemplo da regra** sugere actions ao lado de cada módulo de página.

**Movimentações sugeridas (opcional, mas mais claro):**

- Actions de produto → `app/dashboard/products/_actions/`  
- Actions de inventário → `app/dashboard/inventory/_actions/`  
- Manter a action de sugestão só do dashboard em `app/dashboard/_actions/`

#### 7. Diretório `/hooks` ausente

**Regra:** organizar com `/hooks`; usar hooks para estado/efeitos  

**Atual:** não existe `src/hooks`. Lógica de filtro/paginação está inline em tabelas client grandes, com vários `useMemo`.

**Hooks sugeridos para extrair (exemplos):**

- `useClientPagination`  
- `useTableSearch`  

Usados por:

- `inventoryTable.tsx`  
- `productTable.tsx`  
- `inventoryItemsTable.tsx`  
- `productInventoryHistory.tsx`

#### 8. Diretório `/styles` ausente

**Regra:** diretórios claros incluindo `/styles`  

**Atual:** estilos em `src/app/globals.css` (válido no App Router do Next).

**Correção:** criar `src/styles/` e importar no layout raiz, ou atualizar a regra para permitir `app/globals.css` como lugar canônico.

#### 9. Pastas de componentes vazias / não usadas

- `src/components/forms/` — vazia  
- `src/components/tables/` — vazia  

**Correção:** remover dirs vazios, ou mover peças presentacionais compartilhadas para lá quando forem reutilizadas entre módulos.

#### 10. Nota de alias de path na regra de stack está um pouco desatualizada

**Regra de stack** lista `@/actions` como convenção de path.  

**Atual:** actions vivem em `@/app/.../_actions`, não em `src/actions`.

**Correção:** atualizar a seção de path aliases em `project-stack.mdc` para `@/app/**/_actions` (ou criar `src/actions` e migrar — não necessário se a colocação por rota for a preferência).

---

### P1 — Práticas React / Next

#### 11. `useMemo` desnecessário com React Compiler ligado

**Regra:** stack — evitar `useMemo` / `useCallback` salvo se o profiling exigir  

**Arquivos:**

- `inventoryTable.tsx` (3×)  
- `productTable.tsx` (2×)  
- `inventoryItemsTable.tsx` (2×)  
- `productInventoryHistory.tsx` (2×)  
- `components/ui/field.tsx` (gerado pelo shadcn — menor prioridade)

**Correção:** remover `useMemo` no nível da app para derivações simples de filtro/ordenação/paginação; manter só se houver regressão medida.

#### 12. `searchParams` de URL para estado no servidor não usado

**Regra:** “Use URL query parameters for data fetching and server state management”  

**Arquivo:** `src/app/dashboard/page.tsx` — tipagem de `searchParams` comentada; sugestão de inventário é 100% client + Server Action.

**Correção (se seguir a regra à risca):** dirigir `days` / `limit` (e filtros semelhantes) via `searchParams`, buscar no servidor e manter o formulário como filtro que atualiza a URL.

#### 13. Client components grandes (anti-monólito)

**Regra:** sem componentes monolíticos grandes; unidades pequenas com responsabilidade única  

| Arquivo | ~Linhas | Divisão sugerida |
| --- | --- | --- |
| `importInventoryCSV.tsx` | ~300 | formulário · tabela de preview · ações de confirmação |
| `productTable.tsx` | ~280 | formulário de busca · corpo da tabela · paginação |
| `inventoryTable.tsx` | ~230 | idem |
| `importProductsCVS.tsx` | ~190 | formulário · wiring do dialog de overview |
| `suggestInventory.tsx` | ~180 | formulário · tabela de resultados |
| `dashboard/page.tsx` | ~160 | extrair cards de métricas para `_components` |

#### 14. Lacunas nos padrões de nomenclatura

**Regra:** booleanos com prefixo de verbo (`isLoading`, `hasError`, …); handlers com `handle*`  

| Local | Atual | Sugerido |
| --- | --- | --- |
| Prop de `LoadingOverlay` | `loading` | `isLoading` |
| Diversos | em geral bom (`isPending`, `handleClear`, …) | manter consistência |

#### 15. Typos em nomes de arquivo / identificadores (clean code / organização)

| Atual | Sugerido |
| --- | --- |
| `importProductsCVS.tsx` | `importProductsCSV.tsx` |
| `donwloadButtonHelpers.tsx` | `downloadButtonHelpers.tsx` |
| `dashbardService.ts` | `dashboardService.ts` |
| `getInventoryProducctService` | `getInventoryProductService` |

Atualizar todos os imports após os renames.

#### 16. Imports mortos / não usados

| Arquivo | Não usado |
| --- | --- |
| `dashboard/page.tsx` | `Card`, `getProductsService` |
| `dashboard/layout.tsx` | `toast`, `getToken`, possivelmente `LogoutButton` se não estiver no JSX |
| `products/page.tsx` | import de `ImportProductsCVS` |

Limpar para clareza no lint.

---

### P2 — Qualidade, testes, observabilidade (nas regras, ausentes no repo)

| Regra | Estado atual | Mudança necessária |
| --- | --- | --- |
| Jest + React Testing Library | sem setup de testes / sem `*.test.*` | adicionar Jest/Vitest + RTL; cobrir schemas, `parseCsvFile`, actions/services críticos |
| JSDoc / módulos documentados | comentários esparsos | documentar APIs públicas de services/actions; manter README/notas de módulo atualizados |
| Sentry (ou similar) | nenhum | adicionar tracking de erros se a regra continuar obrigatória; senão suavizar a regra |
| Dynamic import / lazy loading | não usado | considerar `next/dynamic` para tabelas/import UIs pesadas no client |
| `error.tsx` / fallbacks mais ricos | só UI ad-hoc com try/catch | adicionar `error.tsx` / `not-found.tsx` no nível da rota onde fizer sentido |
| Prisma/Drizzle | N/A (API HTTP externa) | atualizar a regra: DAL é `services` + `apiClient`, não um ORM |
| Texto “stay up to date” de AuthJS / Prisma | stack usa JWT + API remota | alinhar `project-rules.mdc` com a stack |

---

### P2 — Consistência de schemas (convenções Zod de `project-stack`)

| Problema | Arquivos | Correção |
| --- | --- | --- |
| Estilo misto de import do Zod | `inventorySchema.ts` usa `import z from "zod"`; `productSchema.ts` / `authSchemas.ts` usam `import { z } from "zod"` | padronizar um estilo (a stack prefere `import z from "zod"`) |
| Schemas de sugestão duplicados | `suggestInventorySchema` em `inventorySchema.ts` vs `suggestionSchema` em `productSchema.ts` | manter um único schema em `schemas/inventorySchema.ts`; apagar ou reexportar o duplicado |
| `inventoryImportSchema` em `productSchema.ts` | domínio produto vs inventário | mover schemas de CSV de inventário para `inventorySchema.ts` |

---

## Instantâneo da organização (atual vs alvo)

### Atual (simplificado)

```text
src/
  app/
    auth/_actions/
    auth/login/_components/
    dashboard/_actions/          # todas as mutações do dashboard
    dashboard/_components/
    dashboard/{products,inventory,help}/_components/
  components/{ui,navs,headers,...}
  services/{user,product,inventory,dashboard}
  schemas/
  lib/
  types/
  # faltando: hooks/, data-access/, styles/
```

### Alvo se aplicar plenamente `project-rules.mdc` + stack

```text
src/
  app/
    auth/
      _actions/
      data-access/
      login/_components/
    dashboard/
      _actions/                 # só do dashboard
      data-access/
      _components/
      products/
        _actions/
        data-access/
        _components/
      inventory/
        _actions/
        data-access/
        _components/
  components/                   # somente compartilhado
  hooks/                        # hooks client compartilhados
  services/                     # adapters HTTP compartilhados (opcional) OU incorporar em data-access
  schemas/
  lib/
  types/
  styles/                       # ou manter app/globals.css e atualizar a regra
```

---

## Conflitos entre arquivos `.mdc`

Resolver nas regras primeiro para que auditorias futuras sejam inequívocas:

| Tema | `project-rules.mdc` | `project-stack.mdc` / código atual |
| --- | --- | --- |
| Versão do Next | “Next.js 15 or version provided” | Next **16.2.9** |
| Auth | AuthJS 5 | Cookies JWT customizados + `jsonwebtoken` |
| Camada de dados | `data-access` por rota | `src/services` global |
| ORM / scaling | Prisma ou Drizzle | REST remoto via `apiClient` |
| Path das actions | implícito perto das páginas | `@/app/**/_actions` (não `src/actions`) |

**Recomendação:** tratar `project-stack.mdc` como fonte da verdade para versões e bibliotecas; editar `project-rules.mdc` para remover pressupostos de AuthJS/Prisma/Next 15 e formalizar o padrão services + `_actions` colocados, se não houver plano de migrar pastas DAL.

---

## Ordem sugerida de remediação

1. **Limpeza das regras** — corrigir redação de AuthJS / Next 15 / Prisma / `data-access` vs a stack real.  
2. **Zod no servidor** nas actions em lote de inventário/produto + validação das linhas do CSV.  
3. **Remover secrets `NEXT_PUBLIC_`** e `console.log`s de debug.  
4. **Renomear typos** e apagar imports mortos/pastas vazias.  
5. **Dividir client components grandes** + extrair hooks compartilhados de tabela; remover `useMemo` redundante.  
6. **Adicionar testes** para schemas, parsing de CSV e Server Actions críticas.  
7. **Opcional:** introduzir pastas `data-access` ou documentar oficialmente `services` como DAL; ligar filtros do dashboard a `searchParams` se desejado.

---

## Placar (informal)

| Área | Status |
| --- | --- |
| Versões da stack e setup Tailwind/shadcn | Passa |
| App Router + RSC por padrão | Passa |
| `_components` colocados | Passa (com alguns arquivos grandes) |
| Separação services vs UI | Quase passa |
| Server Action + Zod em todas as mutações | Falha (parcial) |
| Regra de auth como escrita (AuthJS) | Falha / desalinhamento de regra |
| Layout `data-access` + `/hooks` | Falha |
| Nomenclatura / typos / código morto | Parcial |
| Testes / Sentry / JSDoc | Falha |
| Flags de cookie seguros | Passa |
| Higiene de memo com React Compiler | Parcial |

**Em resumo:** a implementação está alinhada à **stack declarada**, mas ainda não à **regra de projeto mais ampla**. Fechar os itens P0 de validação/segurança e resolver os conflitos entre regras deixa o repositório com um padrão coerente e aplicável.
