# AGENTS.md — Portfolio Sarobidy

## Tech Stack (DO NOT CHANGE without explicit user approval)

- **Framework:** Next.js 16 (App Router, Turbopack)
- **React:** 19.x
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`, `@import "tailwindcss"`, `@theme`)
- **CMS:** Sanity (`next-sanity`, `sanity`) — DO NOT REMOVE
- **i18n:** `i18next` + `next-i18next` + `react-i18next` — DO NOT REMOVE
- **Language:** TypeScript (strict)
- **Package manager:** npm

## Design Decisions (LOCKED)

- **Font:** Montserrat (sans), Lora (serif), JetBrains Mono (mono) — loaded via Google Fonts
- **Primary color:** Orange (#f97316) — NOT blue, NOT any other color
- **Dark mode:** class-based via `@custom-variant dark`
- **Language:** French primary, English secondary (i18n toggle exists)

## What NEVER to do

1. **Never remove Sanity** — it's the CMS, the user wants it
2. **Never change the font** — Montserrat is locked
3. **Never change primary colors** — orange is locked
4. **Never remove i18n** — language switcher must stay
5. **Never downgrade dependencies** — Next.js 16, React 19, Tailwind v4 are current
6. **Never remove `@tailwindcss/postcss`** — required for Tailwind v4 + Sanity CSS
7. **Never edit `.env.local`** — Sanity credentials

## Verification before ANY commit

```bash
npm run typecheck
npx eslint src
npm run format:check
npm run build
```

All 4 must pass. If `next lint` fails, use `npx eslint src` instead (known Next.js 16 bug).

## File conventions

- Components: `src/components/{domain}/ComponentName.tsx`
- Pages: `src/app/[locale]/route/page.tsx`
- Content: `src/content/**/*.mdx`
- Schemas: `src/lib/schemas/*.ts`
- Constants: `src/lib/constants/*.ts`

## Consistency Conventions

| Concern | Convention |
| --- | --- |
| Naming (fichiers) | `kebab-case` pour les fichiers (`PersonaCard.tsx` → component, `use-chat.ts` → hook) |
| Naming (composants) | `PascalCase` pour les composants React, prefixed par feature (`ChatMessage`, `ProjectCard`) |
| Naming (hooks) | `use-` prefix (`use-chat.ts`, `use-theme.ts`) |
| Naming (routes) | Lowercase, kebab-case (`/decision-log`, `/starter-kits`) |
| Data formats | Dates en ISO 8601, IDs Sanity natifs (`string`), slugs en kebab-case |
| Error handling | Server: server components catchent les erreurs Sanity au niveau feature et rendent un fallback feature-level (`<ErrorFallback feature="projects" />`). Les erreurs ne remontent vers `error.tsx` que si le fallback lui-même échoue ou si l'erreur est irrécupérable. Client: toasts ou messages inline, jamais de crash |
| Shared client state shapes | Quand ≥2 features convergent vers un même type de données client, l'extraire dans `src/components/ui/types.ts` avec un type canonique unique |
| Styling | Tailwind utility-first. Pas de CSS modules sauf animations complexes. `cn()` pour le conditionnel |
| State | Server state via Sanity (pas de SWR/React Query pour le CMS). UI state locale via `useState`. Pas de state management global |
| SEO | Metadata dynamique par page via `generateMetadata()`. JSON-LD dans le layout racine |
| **Noms explicites** | Aucune devinette. Variables, fonctions et composants nommés pour qu'on lise le code comme de la prose. Pas de `d`, `tmp`, `data2`, `handler`. Si un nom ne se devine pas à la première lecture, il est mal nommé |
| **Responsabilité unique (SRP)** | Une fonction = une seule mission. Un composant = un seul rôle. Si une fonction fait `parse` + `validate` + `save`, elle est découpée. Si un composant gère l'UI + le fetch + le state, il est séparé |
| **Code mort = supprimé** | Pas de code commenté "au cas où", pas de variables inutilisées, pas de branches mortes. Git garde l'historique. Si c'est pas utilisé, ça part |
| **Revue de code** | 100% du code passe par une revue croisée avant merge. Pas d'exception, même pour les "petits changements" |
| **Tests automatisés** | Chaque feature a au minimum un test d'intégration qui vérifie le chemin critique. Les tests sont des garde-fous, pas de la documentation. On ne livrerait jamais sans eux |

## When unsure

ASK THE USER before making design or architecture decisions. Do not assume.
