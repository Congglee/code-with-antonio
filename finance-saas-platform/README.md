# Finance SaaS Platform 💰

## 📋 Overview

This project is a full-stack personal finance dashboard built with modern web tooling. It was created by following the tutorial video [Finance SaaS Platform – Build a Fullstack App with Next.js 14, Prisma, Tailwind, Stripe, and Postgres](https://youtu.be/N_uNKAus0II?si=_lxgpyGpr-Re6lv9) by [@codewithantonio](https://www.youtube.com/@codewithantonio).

The platform helps users track income and expenses, manage accounts and categories, visualize spending trends, and import transactions from CSV files. It features secure authentication, responsive UI, powerful data tables with bulk actions, and interactive charts.

## ✨ Features

- Authentication and session management with Clerk
- Dashboard overview with key metrics: Remaining, Income, Expenses (with percent change between periods)
- Interactive charts (daily income/expense trend and spending by category)
- Accounts management (create, edit, delete, bulk delete)
- Categories management (create, edit, delete, bulk delete)
- Transactions management
  - List, filter, create, edit, delete, and bulk delete
  - CSV import with column mapping and validation (supports amount, date, payee)
  - Account and date range filters across the app
- Typed API routes powered by Hono with Edge runtime
- Type-safe validation with Zod and Drizzle Zod
- Data fetching and caching via TanStack Query
- Responsive UI using Tailwind CSS and shadcn/ui primitives
- Toast notifications and inline loading states

## 🛠️ Tech Stack

- Framework: Next.js 14 (App Router, Edge Runtime for API)
- Auth: Clerk (Next.js integration)
- API: Hono (route composition with typed client via hono/client)
- Database/ORM: Postgres (Neon serverless) + Drizzle ORM + Drizzle Kit migrations
- Validation: Zod + @hono/zod-validator + drizzle-zod
- State/Data: TanStack React Query, Zustand (UI sheet/dialog state)
- UI: Tailwind CSS, shadcn/ui (Radix primitives), lucide-react icons
- Charts: Recharts
- Dates: date-fns
- CSV parsing: react-papaparse
- Utilities: clsx, tailwind-merge, query-string

## 🏗️ System Architecture

High-level flow

- Client (Next.js App Router) renders UI and drives navigation and filters via URL search params.
- Auth is enforced globally via middleware; protected routes include dashboard and all API endpoints.
- API routes are implemented with Hono and exposed under `/api` with Edge runtime handlers for GET/POST/PATCH/DELETE.
- The Hono client (hc) is initialized on the client using `NEXT_PUBLIC_APP_URL` to call typed routes.
- Drizzle ORM (neon-http driver) talks to a Neon serverless Postgres instance, storing all entities in a normalized schema.

Data model (`src/db/schema.ts`)

- `accounts`: { id, name, userId, plaidId? }
- `categories`: { id, name, userId, plaidId? }
- `transactions`: { id, accountId -> accounts(id), categoryId? -> categories(id), amount, payee, notes?, date }
- All monetary values are stored in miliunits (1/1000) to avoid floating point issues; utilities convert to/from display values.

Key routes (`src/app/api/[[...route]]/*`)

- `/api/accounts`: CRUD and bulk-delete. Results filtered by Clerk `userId`.
- `/api/categories`: CRUD and bulk-delete. Results filtered by Clerk `userId`.
- `/api/transactions`:
  - Query by date range and optional `accountId`; joined with account and category names.
  - Create, edit, delete, bulk create (used by CSV import), and bulk delete. All operations scoped to the authenticated user.
- `/api/summary`:
  - Returns aggregate KPIs (income, expenses, remaining), category breakdown, and daily series within the selected period.

UI composition

- Root layout sets up `ClerkProvider`, React Query provider, a Sheet provider for entity modals, and global toasts.
- Dashboard layout renders Header (logo, nav, user button, filters) and main content.
- Data grid shows KPIs; charts show daily line chart and category pie; tables use TanStack Table with bulk actions.

## 📦 Installation and Setup

Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)
- A Postgres database (Neon recommended)
- A Clerk application with publishable and secret keys

1. Clone and install

```bash
git clone <your-fork-or-repo-url>
cd code-with-antonio/finance-saas-platform
npm install
```

2. Configure environment variables

- Copy `.env.example` to `.env.local` and fill in values:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_PUBLISHABLE_KEY="pk_test_..."        # optional duplicate, some libs read either
CLERK_SECRET_KEY="sk_test_..."

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_APP_URL=http://localhost:3000

DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"
```

Notes

- For Neon, use the connection string with `sslmode=require`.
- `NEXT_PUBLIC_APP_URL` is used by the Hono client to call your local API.

3. Generate/apply database migrations (Drizzle)

```bash
npm run db:generate
npm run db:migrate
```

Alternatively, if migrations already exist (`drizzle/*.sql`), running `db:migrate` will apply them.

4. (Optional) Seed sample data

```bash
npm run db:seed
```

The seed script populates accounts, categories, and random transactions for the last ~90 days for a sample user ID. Adjust `SEED_USER_ID` in `src/scripts/seed.ts` if testing alongside Clerk.

5. Start the dev server

```bash
npm run dev
```

Visit http://localhost:3000, sign up/sign in with Clerk, and you’ll be redirected to the dashboard.

## 🚀 Usage

After logging in:

- Create accounts and categories from their respective pages.
- Add transactions manually or import via CSV on the Transactions page.
- Use the date and account filters in the header to refine dashboard metrics, charts, and tables.

CSV import tips

- A sample file is available at `data.csv`.
- Required fields: `amount`, `date`, `payee`.
- The import wizard lets you map CSV headers to these fields and skip others.
- Expected date format for parsing is `yyyy-MM-dd HH:mm:ss`; it will be normalized to `yyyy-MM-dd`.
- After mapping, you’ll be prompted to choose the target account for the imported transactions.

## 🔍 Key Features in Detail

- Dashboard KPIs and trends
  - Aggregations computed in `/api/summary`: income, expenses, remaining, percent changes vs. previous period.
  - Daily series filled for missing days to render smooth charts.
  - Category breakdown returns top 3 categories plus “Other”.
- Robust CRUD APIs
  - All endpoints are protected by Clerk middleware; database queries are scoped by `userId`.
  - Zod validation for params and JSON bodies ensures data integrity.
- Data tables with bulk actions
  - Accounts, categories, and transactions tables support row selection and bulk delete.
  - TanStack Table powers sorting/filtering; URL search params synchronize filters across components.
- CSV import + bulk create
  - Map headers, transform amounts to miliunits, parse dates, then POST in bulk to `/api/transactions/bulk-create`.
- Edge-ready backend
  - Hono on Next.js Edge runtime with neon-http driver keeps APIs fast and serverless-friendly.

## 🧑‍💻 Development

### Available Scripts

- `dev`: Start Next.js in development mode
- `build`: Build the Next.js app
- `start`: Start the production server
- `lint`: Run ESLint via `next lint`
- `db:generate`: Generate Drizzle SQL migrations from schema
- `db:migrate`: Apply Drizzle migrations to the database
- `db:seed`: Seed the database with sample data
- `db:studio`: Open Drizzle Studio to inspect the database

### Database Management

- ORM and migrations: Drizzle ORM with Drizzle Kit. Source of truth is `src/db/schema.ts`.
- Migrations: `drizzle/*.sql` and `drizzle/meta/*` track migration history.
- Connection: `DATABASE_URL` (Neon serverless recommended) via `drizzle-orm/neon-http`.
- Seeding: `src/scripts/seed.ts` clears and repopulates base tables with sample data; uses miliunits conversion helpers.
- Schema highlights:
  - Monetary amounts stored as integer miliunits for accuracy.
  - `transactions.accountId` has `onDelete: cascade`; `categoryId` uses `onDelete: set null`.

Common workflow

```bash
# edit src/db/schema.ts
npm run db:generate
npm run db:migrate
npm run db:studio  # optional
```

## 🤝 Contributing

We welcome contributions! Suggested workflow:

- Fork the repository and create a feature branch from `main`: `feat/<short-name>`
- Prefer small, focused pull requests with clear descriptions
- Follow the existing code style (ESLint + Prettier via Next.js defaults)
- Keep public APIs and file paths consistent; update types and docs as needed
- Include screenshots or short descriptions for UI changes

For larger changes, consider opening an issue first to discuss direction and scope.

License note: This project is an educational implementation inspired by the referenced tutorial. Ensure you comply with any third-party service terms (Clerk, Neon) when deploying.
