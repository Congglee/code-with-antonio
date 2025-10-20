# NextAuth V5 🔐

## 📋 Overview

This project is a complete, batteries‑included authentication starter built with Next.js App Router (v14), NextAuth.js v5 (beta), and Prisma. It demonstrates:

- Credentials auth with email/password
- OAuth via Google and GitHub
- Email verification workflow
- Password reset flow
- Optional two‑factor authentication (2FA) via one‑time code
- Role‑based access control (RBAC) with Admin/User roles
- Protected routes (server and client examples)
- Middleware‑level access control and redirect handling
- Example Admin‑only server action and API route

UI components are built with shadcn/ui + Radix primitives and Tailwind CSS. Email delivery uses Resend. Data is persisted in PostgreSQL via Prisma.

Note: This project was built by following the tutorial from the YouTube channel @codewithantonio:

- Video: https://youtu.be/1MTyCvS05V4?si=PAxPHfVpNUzd4EZR
- Channel: https://www.youtube.com/@codewithantonio

## ✨ Features

- NextAuth v5 (JWT sessions) with Prisma Adapter
- Providers:
  - Credentials (email/password with bcryptjs)
  - Google OAuth
  - GitHub OAuth
- Email verification (magic link) and password reset
- 2FA one‑time code via email (5‑minute expiry)
- RBAC with `User` and `Admin` roles
- Protected routes and login redirects via Edge middleware
- Server and client session examples
- Settings form with name, email change, password change, role, and 2FA toggle
- Clean form validation with Zod + React Hook Form
- Polished UI using shadcn/ui, Radix UI, Tailwind, and Sonner toasts

## 🛠️ Tech Stack

- Framework: Next.js 14 (App Router)
- Auth: NextAuth.js v5 beta (`next-auth@^5.0.0-beta.21`)
- ORM: Prisma (`@prisma/client`, `prisma`)
- DB: PostgreSQL
- Email: Resend
- UI: Tailwind CSS, shadcn/ui (Radix), lucide-react
- Forms & Validation: React Hook Form, Zod
- Misc: bcryptjs, uuid, next-themes, sonner

Key dependencies are defined in `package.json` with scripts for `dev`, `build`, `start`, `lint`, and `postinstall` (runs `prisma generate`).

## 🏗️ System Architecture

High‑level flow:

- Requests pass through `middleware.ts` for auth gating and redirects
- NextAuth v5 is configured via `auth.config.ts` and assembled in `auth.ts`
- Prisma Adapter stores users/accounts/tokens in Postgres (`prisma/schema.prisma`)
- Actions in `actions/` implement register, login (with 2FA), reset password, verify email, and settings update
- `lib/tokens.ts` manages verification/password/2FA tokens; `lib/mail.ts` sends emails via Resend
- App routes under `app/` render pages and protected sections; API routes in `app/api/*`

Important files:

- `auth.config.ts`: providers (Google, GitHub, Credentials) and credentials `authorize`
- `auth.ts`: NextAuth config (pages, events, callbacks, adapter, session: jwt) and exports `{ auth, handlers, signIn, signOut, unstable_update }`
- `middleware.ts`: public/auth/api route handling, redirects to `/auth/login` with `callbackUrl` when needed
- `routes.ts`: public routes, auth routes, API auth prefix, default login redirect
- `prisma/schema.prisma`: models `User`, `Account`, `VerificationToken`, `PasswordResetToken`, `TwoFactorToken`, `TwoFactorConfirmation`
- `lib/prisma.ts`: PrismaClient singleton
- `lib/tokens.ts`: token generation and replacement
- `lib/mail.ts`: email helpers (Resend) for verification, reset, 2FA codes
- `schemas/index.ts`: Zod schemas for forms (Login, Register, Reset, NewPassword, Settings)
- `actions/*.ts`: server actions (register, login, reset, new-password, new-verification, settings, admin)
- `app/(protected)/*`: protected pages (admin/client/server/settings) rendered under a protected layout with `Navbar`
- `app/api/auth/[...nextauth]/route.ts`: NextAuth route handlers (v5)
- `app/api/admin/route.ts`: Admin-only API route

Session/Callback details (`auth.ts`):

- session strategy: JWT
- on `linkAccount`: set `emailVerified`
- `signIn` callback (credentials): requires verified email; if 2FA enabled, requires a fresh `TwoFactorConfirmation`
- `jwt` callback: adds `isOAuth`, `name`, `email`, `role`, `isTwoFactorEnabled` to the token from DB
- `session` callback: reflects token values to `session.user`

RBAC and protection:

- Admin‑only checks in `actions/admin.ts` and `app/api/admin/route.ts` via `currentRole()` from `lib/auth.ts`
- `middleware.ts` denies access to non‑public routes when unauthenticated; prevents visiting auth pages when already signed in

## 📦 Installation and Setup

Prerequisites:

- Node.js 18+
- PostgreSQL database
- Resend account (for emails)
- Google and GitHub OAuth apps

1. Clone and install dependencies

```bash
# from the repo root or this folder
cd next-auth-v5
npm install
```

2. Configure environment

Copy `.env.example` to `.env` and fill values:

```env
# DATABASE_URL — Postgres connection string
DATABASE_URL=

# AUTH_SECRET — NextAuth secret (generate below)
AUTH_SECRET=

# GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# RESEND_API_KEY — Resend API key
RESEND_API_KEY=

# NEXT_PUBLIC_APP_URL — e.g. http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Generate `AUTH_SECRET`:

```bash
npx auth secret
```

3. Generate Prisma client and run database migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

4. Start the dev server

```bash
npm run dev
```

App runs on `http://localhost:3000` by default.

## 🚀 Usage

- Home page (`/`): landing with login options (modal or page)
- Auth pages:
  - `/auth/register`: create an account; a verification email is sent
  - `/auth/login`: sign in with credentials, or OAuth via Google/GitHub
  - `/auth/reset`: request a password reset email
  - `/auth/new-password?token=...`: set a new password
  - `/auth/new-verification?token=...`: confirm email
- Protected area (`/(protected)`): guarded by middleware redirect if not logged in
  - `/settings`: update profile, email (re‑verification), password, role, and 2FA
  - `/client`: client component example using `useCurrentUser()`
  - `/server`: server component example using `currentUser()`
  - `/admin`: Admin‑only examples (API route + server action)
- API:
  - `/api/auth/*`: NextAuth v5 handlers
  - `/api/admin`: Admin‑only endpoint (403 otherwise)

Notes on Settings:

- For safety in this starter, the DB update in `actions/settings.ts` is commented out. The page demonstrates validation, optimistic UI (`useSession().update()`), and payload shaping. To persist settings, wire the Prisma update and session update as indicated in the comments.

## 🔍 Key Features in Detail

1. Credentials login with email verification and 2FA

- `auth.config.ts` validates credentials via `LoginSchema` and bcryptjs compare
- If a user hasn’t verified email, a new verification token is issued and emailed
- Optional 2FA: on first submit, an email OTP is sent; on second submit with `code`, it’s validated and a `TwoFactorConfirmation` record is created; the `signIn` callback enforces that confirmation before issuing session

2. OAuth (Google, GitHub)

- Providers configured in `auth.config.ts` with client ID/secret from env
- On `linkAccount` event, `emailVerified` is set
- If an email is already registered with another provider, NextAuth responds with `OAuthAccountNotLinked` which is surfaced in the login form

3. Email delivery via Resend

- `lib/mail.ts` sends structured emails for verification, password reset, 2FA
- Links use `NEXT_PUBLIC_APP_URL` to compose absolute URLs

4. Tokens management

- `lib/tokens.ts` ensures one active token per email (deletes previous), uniform expiry windows:
  - Verification: 1 hour
  - Password reset: 1 hour
  - 2FA: 5 minutes, 6‑digit numeric

5. Middleware protection and redirects

- Public routes: `/`, `/auth/new-verification`
- Auth routes (redirect to settings if logged in): `/auth/login`, `/auth/register`, `/auth/error`, `/auth/reset`, `/auth/new-password`
- All other routes require authentication and redirect to `/auth/login?callbackUrl=...`

6. RBAC

- Role assigned via `User.role` (`USER` default)
- `components/auth/role-gate.tsx` guards UI fragments by role
- Admin API and server action check `currentRole()`

7. Data model (Prisma)

- `User` includes `role`, `isTwoFactorEnabled`, `emailVerified`
- OAuth accounts stored in `Account` with `[provider, providerAccountId]` unique index
- Token tables for verification/password reset/2FA; `TwoFactorConfirmation` indicates a successful second factor for the current login

## 🧑‍💻 Development

- Path alias: `@/*` from project root (`tsconfig.json`)
- Tailwind configured in `tailwind.config.ts` with dark mode class and shadcn tokens
- PostCSS configured with Tailwind plugin only
- Linting via `eslint` + `eslint-config-next`

### Available Scripts

From `package.json`:

- `npm run dev` — start Next.js in development
- `npm run build` — build for production
- `npm run start` — start production server
- `npm run lint` — run ESLint
- `postinstall` — `prisma generate`

### Database Management

Common Prisma commands:

```bash
# generate client (also runs on postinstall)
npx prisma generate

# create and apply a new migration
npx prisma migrate dev --name <migration_name>

# open Prisma Studio
echo "Launching Prisma Studio on http://localhost:5555" && npx prisma studio

# reset dev DB and reapply migrations (DANGEROUS: dev only)
npx prisma migrate reset --force
```

Environment variables

- See `.env.example` for all required values. Example `DATABASE_URL` format:
  `postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public`

OAuth setup tips

- For local dev, set callback URLs to `http://localhost:3000/api/auth/callback/<provider>` in your provider dashboards
- Ensure your `NEXT_PUBLIC_APP_URL` matches the served URL
- Use `npx auth secret` to rotate `AUTH_SECRET` if needed

Email (Resend)

- Set `RESEND_API_KEY`
- Update the `from` address in `lib/mail.ts` to a verified domain/sender in your Resend account

## 🤝 Contributing

- Fork and create a feature branch
- Keep changes minimal and focused; include a brief description
- If you enable settings persistence, ensure you add appropriate validation and update the session using `unstable_update` or client `useSession().update()`

Quality gates (docs change only):

- Build: PASS (no code changes)
- Lint/Typecheck: PASS (no code changes)
- Tests: PASS (no tests in this package)
