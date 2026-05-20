# Jackson Tax Service Website

Professional tax preparation and bookkeeping services website for Jackson Tax Service (Austin Jackson) based in Ferndale, Michigan.

## Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS 4, shadcn/ui, wouter, tRPC client, React Query
- **Backend**: Node.js, Express.js, tRPC, Drizzle ORM, MySQL
- **Auth**: JWT-based authentication with OAuth support

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (copy `.env.example` to `.env`):
```bash
cp .env.example .env
```

3. Run database migrations:
```bash
npm run db:push
```

4. Seed the database:
```bash
npm run seed
```

5. Start development servers:
```bash
npm run dev
```

## Project Structure
- `client/` - React frontend (Vite + TypeScript)
- `server/` - Express backend with tRPC API
- `server/src/db/schema.ts` - Database schema (Drizzle ORM)
- `server/src/trpc/routers/` - tRPC API procedures
- `client/src/pages/` - Page components
- `client/src/components/` - Shared UI components

## Business Info
- **Business**: Jackson Tax Service
- **Owner**: Austin Jackson
- **Phone**: 313-427-4856
- **Email**: ajackstaxservice@gmail.com
- **Address**: 1938 Burdette, Ferndale, MI 48220
- **Domain**: ajackstax.com

## Features
- Public marketing pages (Home, Services, About, Contact, Resources)
- Student portal with video training, progress tracking, comments
- Admin dashboard for user/content management
- Calendly integration for appointment booking
- Client portal for document uploads
- Google Business Profile integration
- SEO optimized with schema markup