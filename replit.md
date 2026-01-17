# Kitty-Cart

## Overview

A gift store e-commerce application built for a personalized shopping experience. Users browse curated products, select items with color options, and submit orders with delivery information. The app features a minimalist gray aesthetic with elegant animations and a playful cat mascot element.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router) - handles `/`, `/admin`, and 404 pages
- **State Management**: TanStack React Query for server state and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming (minimalist gray palette)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for page transitions, floating effects, and interactive elements
- **Forms**: React Hook Form with Zod validation for checkout form
- **Build Tool**: Vite with path aliases (`@/` for client/src, `@shared/` for shared, `@assets/` for attached_assets)
- **Fonts**: Playfair Display (headings) and Outfit (body text) from Google Fonts

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript using ESM modules
- **API Design**: RESTful endpoints with type-safe contracts defined in `shared/routes.ts` using Zod schemas
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development**: tsx for TypeScript execution, Vite dev server with HMR proxy

### Data Storage
- **Database**: PostgreSQL (connection via `DATABASE_URL` environment variable)
- **Schema Location**: `shared/schema.ts` using Drizzle table definitions
- **Migrations**: Drizzle Kit with migrations output to `./migrations` folder
- **Current Tables**: 
  - `orders` - id, address, phone, note, items (JSONB), total, status, createdAt

### API Structure
All API routes are defined in `shared/routes.ts` with Zod input/output schemas:
- `POST /api/orders` - Create new order with address, phone, note, items, total
- `GET /api/orders` - List all orders (used by admin dashboard)

### Project Structure
```
Kitty-Cart/
├── client/           # React frontend
│   └── src/
│       ├── components/   # UI components including shadcn/ui
│       ├── hooks/        # Custom React hooks (use-orders, use-toast, use-mobile)
│       ├── pages/        # Page components (GiftStore, admin/Dashboard, not-found)
│       └── lib/          # Utilities (queryClient, utils)
├── server/           # Express backend
│   ├── index.ts      # Server entry point with middleware
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database operations (DatabaseStorage class)
│   ├── db.ts         # Drizzle database connection
│   └── vite.ts       # Vite dev server setup
├── shared/           # Shared between client/server
│   ├── schema.ts     # Drizzle database schema and Zod types
│   └── routes.ts     # API route contracts with Zod schemas
└── script/
    └── build.ts      # Production build script (Vite + esbuild)
```

## External Dependencies

### Database
- **PostgreSQL**: Primary database, configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database operations with `drizzle-orm` and `drizzle-zod`
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Smooth animations and page transitions
- **canvas-confetti**: Celebration effects on order success
- **lucide-react**: Icon library
- **Radix UI**: Accessible UI primitives (via shadcn/ui components)
- **react-hook-form**: Form state management with Zod resolver

### Build Tools
- **Vite**: Frontend bundler with React plugin and HMR
- **esbuild**: Server bundling for production
- **tsx**: TypeScript execution for development

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner