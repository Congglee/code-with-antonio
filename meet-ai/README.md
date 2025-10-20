# Meet AI 🤖

## 📋 Overview

This project was built by following the tutorial video “Build and Deploy a SaaS AI Agent Platform | Next.js 15, React, Better Auth, Polar | Full Course 2025” by @codewithantonio.

Meet AI is a full‑stack platform for running AI‑assisted video meetings with automated transcription, summarization, and post‑meeting chat. Users create custom AI agents with instructions, host meetings with Stream Video, get automatic transcripts, and receive concise AI‑generated summaries. After meetings, users can continue chatting with the AI agent in the meeting’s channel to ask follow‑up questions based on the summary and chat history.

## ✨ Features

- Authentication and social login (email/password, Google, GitHub) with Better Auth
- Subscription and billing via Polar (free tier limits, checkout, customer portal)
- Agents: create and manage custom AI agents with instructions
- Meetings: schedule and host video meetings with Stream Video
- Automatic transcription and recording via Stream; transcript stored as JSONL
- Automatic meeting summarization using Inngest + OpenAI
- Post‑meeting AI chat: ask follow‑ups in the meeting channel powered by OpenAI
- Dashboard UI with tables, filters, pagination, and responsive layout
- Role‑based protection on API routes via tRPC procedures
- Dark/light theme support and a modern component library

## 🛠️ Tech Stack

- Frontend: Next.js 15 (App Router), React 19, TypeScript, TanStack Query, tRPC
- UI: Tailwind CSS v4, Radix UI, class‑variance‑authority, shadcn‑style components
- Auth: Better Auth (@polar-sh/better-auth plugin for Polar)
- Payments: Polar (sandbox)
- Video/Chat: Stream (Video and Chat SDKs)
- AI: OpenAI (gpt‑4o) for summarization and chat
- Jobs/Orchestration: Inngest
- Database: Postgres (Neon serverless) with Drizzle ORM and drizzle‑kit
- Utilities: Zod, date‑fns, embla carousel, recharts, lucide‑react, Dicebear avatars

## 🏗️ System Architecture

- App Router pages under `src/app`:
  - `(auth)` for sign‑in/sign‑up, `(dashboard)` for authenticated app (agents, meetings, call, upgrade)
  - API routes under `src/app/api` for auth, tRPC, Inngest, and Stream webhook
- Server integration:
  - Better Auth configured in `src/lib/auth.ts` with Drizzle adapter and Polar plugins
  - tRPC server in `src/trpc` with protected and premium procedures
  - Stream Webhook handler `src/app/api/webhook/route.ts` reacts to call lifecycle events:
    - Starts meeting, connects OpenAI Realtime agent, ends call, saves transcript/recording
    - Triggers Inngest function `meetings/processing` to summarize transcripts
  - Inngest server in `src/app/api/inngest/route.ts` serving `meetingsProcessing` from `src/inngest/functions.ts`
- Database schema in `src/db/schema.ts`:
  - Auth tables: `user`, `session`, `account`, `verification`
  - Domain tables: `agents`, `meetings` with `meeting_status` enum (upcoming, active, completed, processing, cancelled)
- TRPC routers:
  - `agents` CRUD with premium limit checks
  - `meetings` CRUD, Stream token generation, transcript resolution
  - `premium` (products, current subscription, free usage)
- Client integration:
  - `TRPCReactProvider` provides React Query + tRPC client
  - Stream Video client created on demand with server‑generated user tokens
  - Post‑meeting chat via Stream Chat; AI responses generated via OpenAI

## 📦 Installation and Setup

1. Clone the repository
2. Install dependencies
3. Create and populate `.env` from `.env.example`
4. Push database schema
5. Run the dev server

Environment variables (`.env`):

- DATABASE_URL=Postgres connection string (Neon serverless recommended)
- BETTER_AUTH_SECRET, BETTER_AUTH_URL
- GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
- GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
- NEXT_PUBLIC_APP_URL (e.g. http://localhost:3000)
- NEXT_PUBLIC_STREAM_VIDEO_API_KEY, STREAM_VIDEO_SECRET_KEY
- NEXT_PUBLIC_STREAM_CHAT_API_KEY, STREAM_CHAT_API_SECRET
- OPENAI_API_KEY
- POLAR_ACCESS_TOKEN (Polar sandbox)

Steps:

- Install packages
- Set up your Postgres database and set DATABASE_URL
- Run Drizzle push to create tables
- Start Next.js dev server

On Windows bash:

```bash
npm install
cp .env.example .env
# Fill in .env values
npm run db:push
npm run dev
```

Optional:

- `npm run db:studio` launches drizzle‑kit studio
- `npm run dev:webhook` starts ngrok tunnel for webhook testing

## 🚀 Usage

- Sign up or sign in (email/password or Google/GitHub)
- Create an Agent with a clear instruction prompt
- Create a Meeting and select an Agent
- Join the call: the agent will join, transcription and recording auto‑start
- End the call: a webhook stores the transcript, Inngest summarizes it
- Open the completed meeting to read the summary
- Use the meeting’s chat to ask follow‑ups; the AI replies based on the summary and recent chat

Note: Free tier usage limits are enforced (see Premium). Use the Upgrade page to subscribe via Polar.

## 🔍 Key Features in Detail

- Better Auth + Drizzle
  - Email/password and social providers with Drizzle adapter (`src/lib/auth.ts`)
  - Server helpers to protect procedures (`protectedProcedure`, `premiumProcedure`)
- Stream Video integration
  - Meeting creation provisions a Stream Call with transcription/recording auto‑on
  - User and agent tokens generated server‑side (`meetings.generateToken`)
- Webhooks and background processing
  - Stream webhook verifies signature, updates meeting status, stores transcript/recording
  - Inngest function reads transcript JSONL and uses OpenAI to produce markdown summary
- Post‑meeting AI chat
  - Stream Chat webhook path handles message.new events
  - Builds context from last messages + meeting summary + agent instructions and responds via OpenAI
- Premium and limits
  - Polar SDK for products, checkout, and portal
  - Free limits: `MAX_FREE_AGENTS` and `MAX_FREE_MEETINGS` (defaults to 5)

## 🧑‍💻 Development

### Available Scripts

- `npm run dev` — start Next.js in development
- `npm run build` — build for production
- `npm run start` — start production server
- `npm run lint` — run ESLint
- `npm run db:push` — push Drizzle schema to the database
- `npm run db:studio` — open Drizzle Studio
- `npm run dev:webhook` — run ngrok for local webhook testing

### Database Management

- ORM: Drizzle ORM with `drizzle-kit`
- Config: `drizzle.config.ts` points to `src/db/schema.ts` and `./drizzle` output
- Apply schema: `npm run db:push`
- Studio: `npm run db:studio` for a visual explorer
- Tables: `user`, `session`, `account`, `verification`, `agents`, `meetings` (+ enum)

## 🤝 Contributing

1. Fork the repo and create a feature branch off `main`
2. Keep changes small and focused; add/update tests where applicable
3. Follow the existing code style (ESLint/Prettier via Next config, Tailwind conventions)
4. Open a Pull Request with a clear description, screenshots if UI changes, and steps to test
5. For breaking changes, start a discussion first

Branch naming suggestions: `feat/*`, `fix/*`, `chore/*`, `docs/*`.

Thanks to @codewithantonio for the original course and architecture inspiration.
