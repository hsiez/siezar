# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint (next/core-web-vitals + next/typescript)
```

No test framework is configured.

## Architecture

Personal website (siezar.com) built with Next.js 15 (App Router), React 19, and TypeScript. Currently features a travel journal for CDMX with photo galleries, journal entries, and itinerary tables.

### Routing

- `/` — Home page (`app/page.tsx`)
- `/travel/cdmx` — CDMX travel journal (`app/travel/cdmx/page.tsx`)

### Component Pattern

Components live in `app/components/field-notes/` using folder-per-component:
```
component-name/
  component-name.tsx
  component-name.module.css
```

All styling uses CSS Modules — no CSS-in-JS or utility frameworks.

### Data & Validation

Travel data uses Zod schemas with a consistent pattern: define schema → export inferred type → export validation function.

- `app/travel/cdmx/data/schema.ts` — Trip/journal entry structure (`TripData`, `TripDay`, `TripEntry`)
- `app/travel/cdmx/data/itinerary/schema.ts` — Places with ratings (`Place`, `ItineraryData`)
- `app/travel/cdmx/data/journal-entries/trip-data.json` — Raw trip content (validated at page level)
- `app/travel/cdmx/data/photos.ts` — Photo imports organized by day

### Path Alias

`@/*` maps to project root (e.g., `@/app/components/...`).

## Design System

CSS custom properties are defined in `app/globals.css`. Always use these variables in CSS modules:

- **Font sizes**: `--font-size-xs` through `--font-size-4xl`
- **Spacing**: `--space-xs` through `--space-3xl`
- **Colors**: `--vintage-*` palette (red, blue, green, yellow with primary/secondary variants), `--vintage-paper-color` for backgrounds
- **Transitions**: `--transition-fast` (150ms), `--transition-normal` (300ms)
- **Fonts**: Geist Sans/Mono (via next/font), Grape Nuts (cursive accent via `.grape-nuts` class)

## Animation Rules

- Max duration: 300ms. Prefer CSS transitions over animation libraries.
- `ease-out` for entering elements, `ease-in-out` for on-screen elements, avoid `ease-in`.
- Hover: 150ms. Modal enter: 200ms, exit: 150ms.

## UI Principles

- Use font-weight (600-700) for emphasis instead of larger sizes. De-emphasize with softer colors, not smaller text.
- Primary actions: solid high-contrast. Secondary: outline/lower-contrast. Tertiary: link styling.
- Keep border radius consistent — don't mix rounded and sharp corners.
- Start with generous spacing, reduce gradually. No two spacing values closer than 25% apart.
