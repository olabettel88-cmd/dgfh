# Replit.md

## Overview

A gift store e-commerce application built for a personalized shopping experience. The app displays curated products that users can select, then submit orders with delivery information. It features a minimalist gray aesthetic with smooth animations and a playful design including floating elements and confetti effects on successful orders.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for page transitions and interactive elements
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in shared/routes.ts with Zod schemas
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development**: tsx for TypeScript execution, Vite dev server with HMR

### Data Storage
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Schema Location**: shared/schema.ts using Drizzle table definitions
- **Migrations**: Drizzle Kit with migrations output to ./migrations folder
- **Current Tables**: orders (id, address, phone, note, items as JSONB, total, status, createdAt)

### Project Structure
```
client/           # React frontend
  src/
    components/   # UI components including shadcn/ui
    hooks/        # Custom React hooks
    pages/        # Page components (GiftStore, not-found)
    lib/          # Utilities (queryClient, utils)
server/           # Express backend
  index.ts        # Server entry point
  routes.ts       # API route handlers
  storage.ts      # Database operations
  db.ts           # Database connection
shared/           # Shared between client/server
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod types
```

### API Structure
Routes are defined declaratively in shared/routes.ts with:
- HTTP method, path, input schema, and response schemas
- Type-safe contracts shared between frontend and backend
- Current endpoints: POST /api/orders (create), GET /api/orders (list)

## External Dependencies

### Database
- **PostgreSQL**: Required via DATABASE_URL environment variable
- **Drizzle ORM**: Database operations and schema management
- **connect-pg-simple**: PostgreSQL session store (available but not currently used)

### Frontend Libraries
- **Radix UI**: Headless accessible component primitives
- **Framer Motion**: Animation library
- **canvas-confetti**: Celebration effects
- **date-fns**: Date formatting utilities
- **Embla Carousel**: Carousel component
- **Recharts**: Charting library (available via shadcn)

### Development Tools
- **Vite**: Frontend build and dev server
- **esbuild**: Server bundling for production
- **Drizzle Kit**: Database migration tooling
- **TypeScript**: Type checking across the stack