# NewTube 📺

## 📋 Overview

NewTube is a YouTube-like clone built as a tutorial project following the video series by [@codewithantonio](https://www.youtube.com/@codewithantonio): "[Build a YouTube Clone with Next.js 15: React, Tailwind, Drizzle, tRPC (Part 1/2)](https://www.youtube.com/watch?v=ArmPzvHTcfQ)" and "[Build a YouTube Clone with Next.js 15: React, Tailwind, Drizzle, tRPC (Part 2/2)](https://youtu.be/ig26iRcMavQ?si=Rch_e7P06UztWkKD)". The app demonstrates a modern full-stack Next.js 15 architecture with TypeScript, server/client trpc, database modeling with Drizzle ORM, video storage/processing via Mux, file uploads via UploadThing, and a small set of automation workflows (Upstash QStash/Workflow + OpenAI) to generate thumbnails, titles, and descriptions.

Purpose: provide a fully-featured example of a video platform where users can sign up (Clerk), upload videos (Mux uploader), manage video metadata, publish videos publicly/private, comment, react (like/dislike), create playlists, and use AI-assisted workflows to auto-generate thumbnails, titles and descriptions.

This repository contains the full source used in the tutorial and can be used as a starting point for similar streaming/video apps, or as a learning reference.

## ✨ Features

- User authentication with Clerk (create/update/delete user webhooks backed by Svix)
- Video uploads using Mux (client uploader + server-side webhook handling)
- Thumbnail and banner uploads using UploadThing
- Video metadata: title, description, category, visibility (private/public)
- Video playback via Mux Player integration
- Reactions (like/dislike), view counting, subscriptions, comments and comment reactions
- Playlists and playlist management
- Infinite scrolling / cursor-based pagination APIs (tRPC + Drizzle)
- AI-assisted workflows (Upstash Workflows + OpenAI):
  - auto-generate a thumbnail (DALL·E / OpenAI image generation)
  - generate SEO-friendly titles and short descriptions from video transcript
- Rate limiting via Upstash Redis + Upstash RateLimit
- Rich UI components built with Tailwind CSS + Radix primitives

## 🛠️ Tech Stack

- Frontend: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- UI primitives: Radix UI, Lucide icons, class-variance-authority, shadcn/ui style components
- State / data fetching: @tanstack/react-query + trpc (v11 RC) + superjson
- Backend / API: tRPC (server-side procedures) mounted under `/api/trpc`
- Database: PostgreSQL-compatible (Neon) accessed with Drizzle ORM (drizzle-kit + drizzle-orm/pg-core)
- Auth: Clerk (user management, webhooks)
- Video hosting & processing: Mux (uploads, assets, playback, webhooks)
- File uploads & storage: UploadThing (thumbnail and banner uploads)
- Background workflows / webhooks: Upstash Workflow / QStash
- AI: OpenAI (chat completions & image generation - DALL·E)
- Queue & rate-limiting store: Upstash Redis + @upstash/ratelimit
- Misc: SVIX for verifying Clerk webhook signatures, UploadThing UTApi usage, Sonner for toasts

## 🏗️ System Architecture

High level:

- Client: Next.js App Router pages/components (React) interact with tRPC client and call tRPC procedures for data (videos, categories, comments, users, etc.). The client also hosts Mux uploader components for direct uploads.
- Server: Next.js API routes provide two key types of endpoints:
  - /api/trpc — tRPC endpoints served by server-side procedures (driven by Drizzle + business logic)
  - /api/\* endpoints for UploadThing, Mux webhooks, Clerk webhooks, and Upstash workflow route handlers
- Database: Drizzle ORM defines typed tables in `src/db/schema.ts` (users, videos, categories, comments, reactions, subscriptions, playlists, video_views, etc.). The project targets a Postgres-compatible database (Neon is used via drizzle-orm/neon-http in `src/db/index.ts`). `drizzle.config.ts` is configured to output migrations to `./drizzle`.
- Integrations:
  - Mux: client-side uploader + server-side webhooks to update video asset status and generate preview/thumbnail (webhook handler in `src/app/api/videos/webhook/route.ts`).
  - UploadThing: used for user banners and thumbnail uploads and server-side usage via UTApi.
  - Upstash Workflow / QStash: used to run background workflows that call OpenAI to generate titles/descriptions and DALL·E for thumbnail generation.
  - Clerk: authentication provider; Clerk user webhooks kept in sync with the local users table.

Database schema highlights (location: `src/db/schema.ts`):

- `users` — links to Clerk user id (clerk_id) and stores display name and avatar/banner
- `videos` — stores mux upload/asset IDs, playback ids, thumbnail/preview uploads, duration, visibility, user reference and category
- `video_views`, `video_reactions`, `comment_reactions`, `subscriptions`, `comments`, `playlists`, `playlist_videos` — relational tables for app features

This project uses cursor-based pagination for lists (videos, trending, subscribed) and includes server-side logic for viewer-specific fields (viewerReaction, viewerSubscribed) without overfetching.

## 📦 Installation and Setup

Below are the minimal steps to get the project running locally. The app relies on a number of external services (Clerk, Mux, UploadThing, Upstash, OpenAI), so you should create accounts and obtain API keys for each service you plan to use.

1. Clone the repository

```bash
git clone https://github.com/Congglee/code-with-antonio.git
cd new-tube
```

2. Install dependencies

```bash
npm install
```

3. Environment variables

Create a `.env.local` file at the project root and provide the following variables (example values shown as placeholders):

```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk (authentication)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
SIGNING_SECRET=

# Mux (video hosting)
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret
MUX_WEBHOOK_SECRET=your_mux_webhook_signing_secret

# UploadThing / UTApi - uses UploadThing keys from provider dashboard
UPLOADTHING_TOKEN=your_uploadthing_token

# Upstash Redis (rate limit store)
UPSTASH_REDIS_REST_URL=https://.../rest
UPSTASH_REDIS_REST_TOKEN=...token...

# Upstash Workflow / QStash (background workflows)
QSTASH_TOKEN=
UPSTASH_WORKFLOW_URL=
QSTASH_CURRENT_SIGNING_KEY=
QSTASH_NEXT_SIGNING_KEY=

# OpenAI
OPENAI_API_KEY=sk-...
```

Notes:

- You must set up Clerk and configure a webhook (Svix secret) — the repository verifies Clerk webhook signatures using `SIGNING_SECRET`.
- Mux webhooks must be configured to POST to `/api/videos/webhook` and the secret stored in `MUX_WEBHOOK_SECRET`.
- Upstash Workflow endpoints are referenced by environment variable `UPSTASH_WORKFLOW_URL` and used to trigger background AI workflows.

4. Database

This project uses Drizzle. To create migrations and run them you can use drizzle-kit. Example commands (adjust to your environment):

```bash
# Generate a migration (name example)
npx drizzle-kit generate --config ./drizzle.config.ts

# Apply migrations (depends on your setup)
npx drizzle-kit migrate
```

There is a seed script under `scripts/seed-catogories.ts` (note the file name has a typo). To run the seed script locally you can use tsx or ts-node, for example:

```bash
npm install -g tsx # if you don't have it
tsx scripts/seed-catogories.ts
```

5. Development server

```bash
npm run dev
```

If you need to expose the dev server to the internet for incoming webhooks (Mux, Clerk), the project includes a helper script using ngrok:

```bash
# Start dev + ngrok webhook tunnel (edit domain in package.json script before use)
npm run dev:all
```

## 🚀 Usage

- Open http://localhost:3000
- Sign up / sign in using the Clerk flow you configured
- From the Studio area you can upload videos using the Mux uploader component; uploaded videos stay private until you publish them
- After Mux processing completes the webhook will update the video records (playback id, thumbnail/preview stored via UploadThing UTApi)
- Use the UI to add title/description/category, generate AI-assisted thumbnails, titles and descriptions (requires OpenAI + Upstash Workflow configuration)

There are no demo credentials included; Clerk is used for authentication so create test accounts via your configured Clerk application.

## 🔍 Key Features in Detail

- Video Uploads & Processing

  - Client uses `@mux/mux-uploader-react` and Mux uploads API to upload large video files directly to Mux. On upload completion Mux triggers the server webhook at `/api/videos/webhook` which updates the video record, generates temporary thumbnails/previews from Mux playback and re-uploads them via UploadThing UTApi to keep a permanent thumbnail/preview stored.

- UploadThing Integration

  - UploadThing is used for images (thumbnails, user banners). The server `ourFileRouter` in `src/app/api/uploadthing/core.ts` validates ownership and saves file keys/URLs to the DB. `src/lib/uploadthing.ts` provides helper components for client usage.

- AI Workflows (Upstash + OpenAI)

  - Workflows are defined under `src/app/api/videos/workflows/*`. The app triggers Upstash Workflow runs to call OpenAI for title/description generation or DALL·E for thumbnails. The workflow endpoints run server-side, fetch multiplexed transcripts from Mux, call OpenAI, and update the database.

- tRPC + Drizzle
  - The API surface is implemented using tRPC (procedures live under `src/modules/*/server` and are combined at `src/trpc/routers/_app.ts`). Database queries use Drizzle's composable query builder and include counting and viewer-specific joins where needed.

## 🧑‍💻 Development

### Available Scripts

Key npm scripts (from `package.json`):

- `npm run dev` — start Next.js in development mode
- `npm run build` — build the Next.js app for production
- `npm run start` — run the built Next.js app
- `npm run lint` — run Next.js linting
- `npm run dev:webhook` — run ngrok for public webhook tunneling (requires ngrok and editing the script value)
- `npm run dev:all` — concurrently run `dev` and `dev:webhook`

### Database Management

- Schema: defined in `src/db/schema.ts` using Drizzle ORM (pg-core). The schema includes users, videos, categories, comments, reactions, playlists, and pivot tables.
- Migrations: use `drizzle-kit` with `drizzle.config.ts` (configured to use `DATABASE_URL` and output migrations into `./drizzle`). Example:

```bash
npx drizzle-kit generate --config ./drizzle.config.ts --out ./drizzle
npx drizzle-kit migrate --config ./drizzle.config.ts
```

- Seeding: a simple seed file exists at `scripts/seed-catogories.ts` — run it with `tsx`/`ts-node` after your DB is migrated.

## 🤝 Contributing

Thanks for wanting to contribute! This project follows conventional open-source contribution patterns:

- Fork the repository and create feature branches from `main` using descriptive names (e.g., `feat/upload-ux`, `fix/mux-webhook`)
- Open a Pull Request with a clear description of the change and reference any related issues
- Keep commits focused and small; write helpful commit messages
- Follow the existing TypeScript and ESLint rules. Run `npm run lint` and ensure type checks pass before opening a PR

Coding conventions:

- TypeScript + React functional components with hooks
- Keep business logic in server-side procedures (tRPC) and use Drizzle for DB queries
- Place UI components under `src/components` and feature modules under `src/modules/*` (each module may contain `server` and `ui` folders)

## Where to look next (important files)

- `package.json` — scripts and deps
- `drizzle.config.ts` — drizzle config and migrations output
- `src/db/schema.ts` — complete DB schema
- `src/trpc/init.ts` — tRPC context and protectedProcedure with rate limiting
- `src/trpc/routers/_app.ts` — assembled app router
- `src/app/api/videos/webhook/route.ts` — Mux webhook handler
- `src/app/api/uploadthing/core.ts` — UploadThing server router
- `src/modules/studio/ui/components/studio-uploader.tsx` — Mux uploader component

## Troubleshooting and Notes

- If webhooks fail locally, ensure you have a public tunnel (ngrok or similar) and that the tunnel URL is configured in your provider dashboards (Mux, Clerk, Upstash).
- Many features depend on third-party secrets. Start by getting the database, Clerk, and Mux integration working first — then add UploadThing, Upstash and OpenAI.
- The project was built for demonstration and learning — before using it in production, audit security, handle secrets securely, and lock down CORS/webhook endpoints.
