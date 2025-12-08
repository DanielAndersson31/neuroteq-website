# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run check        # Run svelte-check
npm run lint         # Run ESLint
```

## Tech Stack

- **Framework**: SvelteKit with TypeScript
- **Styling**: TailwindCSS v4 (Vite plugin)
- **UI Components**: shadcn-svelte (in `src/lib/components/ui/`)
- **Icons**: lucide-svelte
- **Forms**: sveltekit-superforms + zod
- **Deployment**: Node adapter for self-hosting (Docker ready)

## Architecture

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/          # shadcn-svelte components
│   │   ├── layout/      # Header, Footer, Logo
│   │   ├── sections/    # Page sections (Hero, CTASection, etc.)
│   │   └── shared/      # SEOHead, reusable components
│   ├── config/          # Site config, services, team, testimonials
│   ├── schemas/         # Zod validation schemas
│   └── utils/           # Utilities (cn.ts for class merging)
└── routes/              # SvelteKit pages
```

## Key Patterns

- **SEO**: Use `SEOHead` component on each page for meta tags
- **Forms**: Use superforms with zod schemas (see `src/routes/contact/`)
- **Styling**: Use `cn()` utility for conditional classes, Tailwind classes
- **Components**: shadcn-svelte components are in `$lib/components/ui/`

## Path Aliases

- `$lib` → `src/lib`
- `$components` → `src/lib/components`
- `$config` → `src/lib/config`
- `$schemas` → `src/lib/schemas`
- `$utils` → `src/lib/utils`
