# Siezar.com

Personal website built with [Next.js](https://nextjs.org).

## Current Status

**Active Pages:**
- `/travel/cdmx` - Travel notes and experiences from Mexico City

## Architecture

### Components Structure
Travel page components are organized in `/components/field-notes/` with the following structure:
- Each component has its own folder
- Each folder contains:
  - `ComponentName.tsx` - React component
  - `ComponentName.module.css` - CSS module for styling

### Data Structure
Travel journal data is stored in `travel/cdmx/data/` with two Zod schemas:
- **Itinerary schema** - Structure for planned activities and locations
- **Journal schema** - Structure for travel experiences and notes

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

The site uses:
- [Next.js](https://nextjs.org) - React framework
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font) font family
- CSS Modules for component styling

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
