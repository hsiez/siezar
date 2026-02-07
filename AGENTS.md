# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Personal website (siezar.com) built with Next.js 15, React 19, and TypeScript. Currently features a travel journal for CDMX with photo galleries, journal entries, and itinerary tables.

## Development Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

### Component Organization

Components live in `app/components/field-notes/` using a folder-per-component pattern:
```
ComponentName/
  ComponentName.tsx
  ComponentName.module.css
```

### Data Validation Pattern

All travel data uses Zod schemas for runtime validation. Schemas define structure and export inferred TypeScript types:

```typescript
// Define schema → export type → provide validation function
export const Schema = z.object({...});
export type SchemaType = z.infer<typeof Schema>;
export function validateData(data: unknown): SchemaType { ... }
```

Schemas for travel pages are in `app/travel/[destination]/data/`:
- `schema.ts` - Trip/journal entry structure
- `itinerary/schema.ts` - Places with ratings

### Path Alias

Use `@/*` to import from project root (configured in tsconfig.json).

## Design System

CSS custom properties are defined in `app/globals.css`. Use these variables in CSS modules:
- Font sizes: `--font-size-xs` through `--font-size-4xl`
- Spacing: `--space-xs` through `--space-3xl`
- Colors: `--vintage-*` palette for travel journal aesthetic
- Transitions: `--transition-fast` (150ms), `--transition-normal` (300ms)

## Animation Rules

- Max animation duration: 300ms
- Prefer CSS transitions over animation libraries
- Use `ease-out` for most animations (fast start, slow end)
- Use `ease-in-out` for elements already on screen
- Hover transitions: 150ms
- Modal enter: 200ms, exit: 150ms

## UI Design Principles

**Visual hierarchy**: Use font-weight (600-700) for emphasis instead of larger sizes. De-emphasize with softer colors, not smaller text.

**Action hierarchy**:
- Primary: Solid, high-contrast backgrounds
- Secondary: Outline or lower-contrast backgrounds
- Tertiary: Link styling

**Border radius**: Keep consistent across interface—don't mix rounded and sharp corners.

**Spacing**: Start generous, reduce gradually. No two values closer than 25% apart.
