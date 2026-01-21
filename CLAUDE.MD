# CLAUDE.MD - Gen6 Verificator Project Guide

## Project Overview

**gen6-verificator** is a modern React application built with the TanStack ecosystem, featuring:

- React 19.2.0 with TypeScript
- TanStack Router for file-based routing
- TanStack Query for data fetching
- TanStack Store for state management
- Tailwind CSS 4.0 for styling
- Vite for build tooling
- Vitest for testing

## Project Structure

```
gen6-verificator/
├── src/
│   ├── routes/              # File-based routing (TanStack Router)
│   │   ├── __root.tsx      # Root layout with Header and devtools
│   │   ├── index.tsx       # Home page component
│   ├── components/         # React components
│   │   └── Header.tsx      # Main header component
│   ├── lib/                # Utility libraries
│   │   ├── utils.ts        # Helper functions (cn, etc.)
│   ├── integrations/       # Third-party integrations
│   │   └── tanstack-query/ # React Query setup
│   ├── env.ts              # Environment variables (T3 Env)
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── index.html              # HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── components.json         # Shadcn/ui configuration
└── package.json            # Dependencies and scripts
```

## Technology Stack

### Core Framework

- **React 19.2.0**: Latest React with modern features
- **TypeScript 5.7.2**: Type-safe development
- **Vite 7.1.7**: Fast build tool and dev server

### TanStack Ecosystem

- **TanStack Router 1.132.0**: Type-safe file-based routing
- **TanStack Query 5.66.5**: Data fetching and caching
- **TanStack Store 0.7.0**: State management
- **TanStack Devtools**: Integrated debugging tools

### Styling

- **Tailwind CSS 4.0.6**: Utility-first CSS framework
- **Shadcn/ui**: Component library (via components.json)
- **class-variance-authority**: Component variant management
- **tw-animate-css**: Animation utilities
- **lucide-react**: Icon library

### Polkadot Integration

- **@polkadot/api**: Polkadot blockchain API
- **@polkadot/extension-dapp**: Browser extension integration
- **@polkadot/react-identicon**: React components for identicons
- **@polkadot/keyring**: Key management and signing
- **@polkadot/util-crypto**: Cryptographic utilities

### Additional Tools

- **Zod 4.1.11**: Schema validation
- **T3 Env**: Type-safe environment variables
- **ESLint**: Code linting with TanStack config
- **Prettier**: Code formatting
- **Vitest**: Unit testing framework
- **React Hook Form**: Form management with validation

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start

# Run tests
npm run test

# Lint code
npm run lint

# Format code
npm run format

# Format and lint fix
npm run check
```

## Key Features

### 1. File-Based Routing

Routes are managed as files in `src/routes/`. TanStack Router automatically generates route configuration.

- `src/routes/__root.tsx`: Root layout (Header + Outlet + Devtools)
- `src/routes/index.tsx`: Home page
- Add new routes by creating files in `src/routes/`

### 2. Environment Variables

Environment variables are managed with T3 Env for type safety:

```typescript
import { env } from '@/env'
console.log(env.VITE_APP_TITLE)
```

### 3. Styling with Tailwind CSS 4.0

- Utility-first CSS approach
- Custom components via `src/lib/utils.ts` (cn function)
- Shadcn/ui components can be added via CLI

### 4. Component Library (Shadcn)

Add pre-built components:

```bash
npx shadcn@latest add button
```

### 5. Integrated Devtools

Development tools are integrated in `__root.tsx`:

- TanStack Router Devtools
- TanStack Query Devtools
- TanStack Store Devtools
- Positioned at bottom-right

## Coding Guidelines

### React Patterns

- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused
- Use TypeScript for type safety

### Routing

- Create route files in `src/routes/`
- Use `createFileRoute` for route definition
- Access route data with `Route.useLoaderData()`
- Navigate with `<Link>` component from TanStack Router

### Data Fetching

Choose between:

1. **Route loaders**: Load data before route renders
2. **TanStack Query**: Use `useQuery` for component-level fetching

### State Management

- Use TanStack Store for global state
- Create stores in `src/lib/` or colocate with features
- Use `useStore` hook to subscribe to state

### Styling

- Use Tailwind utility classes
- Use `cn()` from `src/lib/utils.ts` for conditional classes
- Follow mobile-first responsive design
- Leverage Shadcn components for consistency

## Common Tasks

### Adding a New Route

1. Create file in `src/routes/` (e.g., `about.tsx`)
2. Define route with `createFileRoute`
3. Add navigation link using `<Link to="/about">`

### Adding Shadcn Component

```bash
npx shadcn@latest add <component-name>
```

Components are added to `src/components/ui/`

### Creating a Store

```typescript
import { Store } from '@tanstack/store'

export const myStore = new Store({
  // initial state
})
```

### Using TanStack Query

```typescript
import { useQuery } from '@tanstack/react-query'

const { data, isLoading } = useQuery({
  queryKey: ['key'],
  queryFn: async () => {
    // fetch data
  },
})
```

## Demo Files

Files prefixed with `demo` can be safely deleted:

- `src/lib/demo-store.ts`
- `src/lib/demo-store-devtools.tsx`
- `src/routes/demo/`

These demonstrate TanStack features and can be removed once understood.

## Best Practices

1. **Type Safety**: Always define TypeScript types/interfaces
2. **Component Organization**: Keep related files together
3. **Performance**: Use React Query for caching, TanStack Store for minimal re-renders
4. **Testing**: Write tests for business logic and components
5. **Code Quality**: Run `npm run check` before commits
6. **Environment Variables**: Use T3 Env, never hardcode secrets

## Configuration Notes

### Package Overrides

The project uses npm overrides to ensure compatibility and security:

```json
{
  "overrides": {
    "@polkadot/util": "^14.0.1",
    "@polkadot/util-crypto": "^14.0.1",
    "@polkadot/keyring": "^14.0.1",
    "seroval": "^1.4.1",
    "react-copy-to-clipboard": {
      "react": "^19.2.0"
    }
  }
}
```

- **Polkadot packages**: Locked to v14.0.1 for consistency across all Polkadot dependencies
- **seroval**: Forced to v1.4.1+ to fix security vulnerabilities (CVE fixes for RCE, Prototype Pollution, and DoS)
- **react-copy-to-clipboard**: Override to accept React 19 (used by `@polkadot/react-identicon`)

### ESLint Configuration

The project uses TanStack ESLint config with custom rules:

- JavaScript config files (`*.config.js`) are ignored from TypeScript parsing
- Generated files (`routeTree.gen.ts`) are completely ignored
- Disabled rules: `no-unnecessary-condition`, `no-shadow`, `@typescript-eslint/no-shadow`

### TypeScript Configuration

- Includes `.js` config files for IDE support
- Uses path aliases: `@/*` maps to `./src/*`
- Strict mode enabled with additional safety checks

## Resources

- [TanStack Router Docs](https://tanstack.com/router)
- [TanStack Query Docs](https://tanstack.com/query)
- [TanStack Store Docs](https://tanstack.com/store)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Shadcn/ui Docs](https://ui.shadcn.com)
- [Vite Docs](https://vitejs.dev)

## Notes for AI Assistants

- This is a Polkadot-integrated TanStack project
- The app uses file-based routing - routes are in `src/routes/`
- Styling is Tailwind CSS 4.0 with Shadcn components
- State management uses TanStack Store
- Data fetching uses TanStack Query
- Polkadot integration for blockchain interactions
- Always maintain TypeScript type safety
- Use `npm run check` to format and lint code
- Always use absolute imports with `@/` prefix
- Check `package.json` overrides before modifying dependency versions
- Use Zod for form validations
- Always use Shadcn components if possible
- Don't use custom colors, use the semantic colors defined in styles.css unless a custom color is needed to express something
- Don't include unnecessary comments
- Follow the feature/package folder/files structure
