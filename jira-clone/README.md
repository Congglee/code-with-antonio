# Jira Clone 📋

## 📋 Overview

This Jira-style project management platform was implemented by following the tutorial series [Build a Jira Clone With Nextjs, React, Tailwind, Hono.js | Part 1/2 (2024)](https://youtu.be/Av9C7xlV0fA?si=0Q-TGUOapBAcbSBn) and [Build a Jira Clone With Nextjs, React, Tailwind, Hono.js | Part 2/2 (2024)](https://youtu.be/37v63U7-iG0?si=R35BvA8eyA_v2S6u) created by [@codewithantonio](https://www.youtube.com/@codewithantonio). It delivers a multi-workspace issue tracking experience where teams can authenticate, create projects, plan tasks, and monitor progress through analytics-rich dashboards.

## ✨ Features

- Secure authentication with Appwrite email/password sessions plus Google and GitHub OAuth hand-offs.
- Multi-tenant workspaces with invite codes, branded avatars, and role-based member administration.
- Project library per workspace with image uploads backed by Appwrite Storage.
- Comprehensive task management with Zod-validated forms, rich filters, bulk drag-and-drop Kanban reordering, and inline editing.
- Alternate task visualisations including data table, status-based Kanban lanes, and a React Big Calendar month view.
- Workspace and project analytics surfaces highlighting task totals, assignments, completion trends, and overdue work.
- Responsive dashboard shell with mobile sidebar, dark/light theme toggle, and shadcn/ui component primitives.
- Query string driven modals and filters powered by nuqs for shareable UI state.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, shadcn/ui, next-themes, lucide-react.
- **Data & State:** TanStack Query, React Hook Form, Zod, nuqs, TanStack Table, @hello-pangea/dnd, react-big-calendar.
- **Backend & Infrastructure:** Hono route handlers on Next.js, node-appwrite SDK, Appwrite Auth/Database/Users/Storage, Appwrite OAuth providers.
- **Tooling & DX:** ESLint (next/core-web-vitals), tailwindcss-animate, Sonner toasts, Vaul drawers, clsx/tailwind-merge utilities.

## 🏗️ System Architecture

- App Router structure splits flows into `(auth)` for sign-in/up, `(dashboard)` for the authenticated shell (navbar, sidebar, modal portal), and `(standalone)` for focused wizard pages such as workspace creation, invites, and settings.
- `src/app/api/[[...route]]/route.ts` boots a Hono app under `/api`, mounting feature routers for auth, workspaces, projects, members, and tasks. Requests pass through `sessionMiddleware`, which hydrates Appwrite `account`, `databases`, `storage`, and `user` handles from the signed cookie.
- Appwrite stores the domain data in collections whose IDs are provided through `NEXT_PUBLIC_APPWRITE_*` variables: Workspaces (`name`, `userId`, `imageUrl`, `inviteCode`), Members (`workspaceId`, `userId`, `role`), Projects (`name`, `imageUrl`, `workspaceId`), and Tasks (`name`, `workspaceId`, `projectId`, `assigneeId`, `status`, `position`, `dueDate`, `description`). An Appwrite bucket holds uploaded workspace/project images that are streamed back as base64 previews.
- Authentication relies on Appwrite email/password or OAuth flows. Successful login sets an HTTP-only `AUTH_COOKIE`, which server components read via `createSessionClient` while privileged admin calls use `createAdminClient` seeded with `NEXT_APPWRITE_KEY`.
- The client data layer is wrapped by `QueryProvider`, exposing TanStack Query across the tree. Feature-specific hooks in `src/features/**/api` call the typed `hono/client` RPC (`lib/rpc.ts`), invalidate caches after mutations, and coordinate with nuqs-powered query state for filters and modal visibility.
- UI composition follows a domain-driven folder layout (`src/features/*`) alongside reusable primitives in `src/components/ui`. Tailwind theming is centrally configured via CSS variables (`tailwind.config.ts`), shadcn/ui settings (`components.json`), TypeScript path aliases (`tsconfig.json`), and linting rules defined in `.eslintrc.json`.

## 📦 Installation and Setup

1. Ensure Node.js 18+ (or 20+) and an Appwrite instance are available.
2. Clone the repository and move into the Jira clone workspace:
   ```bash
   git clone https://github.com/Congglee/code-with-antonio.git
   cd code-with-antonio/jira-clone
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Copy the environment template and adjust values:
   ```bash
   cp .env.example .env.local
   ```
5. Populate `.env.local` with your Appwrite configuration. Use the table below as a reference.
   | Variable | Purpose |
   | --- | --- |
   | `NEXT_PUBLIC_APP_URL` | Base URL used by the Hono client (e.g., `http://localhost:3000`). |
   | `NEXT_PUBLIC_APPWRITE_ENDPOINT` | Appwrite HTTP endpoint. |
   | `NEXT_PUBLIC_APPWRITE_PROJECT` | Appwrite project ID. |
   | `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | Database ID containing the Jira collections. |
   | `NEXT_PUBLIC_APPWRITE_WORKSPACES_ID` | Collection ID for workspaces. |
   | `NEXT_PUBLIC_APPWRITE_MEMBERS_ID` | Collection ID for members. |
   | `NEXT_PUBLIC_APPWRITE_PROJECTS_ID` | Collection ID for projects. |
   | `NEXT_PUBLIC_APPWRITE_TASKS_ID` | Collection ID for tasks. |
   | `NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID` | Bucket ID used for workspace/project imagery. |
   | `NEXT_APPWRITE_KEY` | Server-side API key with access to Auth, Databases, Users, and Storage. |
6. In Appwrite, create the database, collections, and attributes that match the model expectations described in the architecture section, and enable email/password plus OAuth providers you plan to use. Grant the API key the necessary read/write scopes.
7. Start the development server:
   ```bash
   npm run dev
   ```
8. Visit `http://localhost:3000` and register a user to begin.

## 🚀 Usage

- Sign up with email/password (or OAuth) and log in. The app automatically redirects first-time users to the workspace creation wizard.
- Create one or more workspaces, customize their avatars, and copy invite codes to share with collaborators.
- Within a workspace, create projects, upload logos, and manage membership roles from the standalone settings pages.
- Add tasks via the modal, assign members, due dates, and status. Switch between table, Kanban, and calendar views; drag tasks between columns to reposition or advance their status.
- Use the filter bar to refine tasks by project, assignee, status, due date, or search terms. The view state is persisted in the URL for easy sharing.
- Review analytics cards on workspace and project dashboards to track throughput, assignments, overdue work, and completion trends.

## 🔍 Key Features in Detail

- **Kanban with bulk updates:** Dragging tasks across columns recalculates their `position` values and triggers the `/tasks/bulk-update` endpoint so Appwrite stays in sync with the client order.
- **Calendar scheduling:** The React Big Calendar view maps task due dates across the month and links events back to detailed task routes for quick editing.
- **Workspace governance:** Admin-only actions (delete workspace, reset invite codes, promote/demote members) are enforced by `sessionMiddleware` and the `getMember` utility to prevent unauthorized access.
- **Analytics pipeline:** Date-fns powered queries aggregate task counts by month, assignee, completion, and overdue status, surfaced through reusable `AnalyticsCard` components and scrollable dashboards.

## 🧑‍💻 Development

### Available Scripts

- `npm run dev` — launches the Next.js development server with hot reloading.
- `npm run build` — produces an optimized production build.
- `npm run start` — serves the prebuilt application.
- `npm run lint` — runs ESLint using the Next.js TypeScript configuration.

### Database Management

- Data lives entirely in Appwrite; schema changes are managed through the Appwrite console or API rather than local migrations.
- Ensure collections mirror the expected fields: workspaces (`name`, `userId`, `imageUrl`, `inviteCode`), members (`workspaceId`, `userId`, `role`), projects (`name`, `imageUrl`, `workspaceId`), and tasks (`name`, `workspaceId`, `projectId`, `assigneeId`, `status`, `position`, `dueDate`, `description`).
- Configure indexes that support the queries used throughout the app (e.g., equality on `workspaceId`, `projectId`, `status`, `assigneeId`, and ordering on `$createdAt` or `position`).
- Maintain an Appwrite storage bucket capable of accepting images up to 1 MB; the server routes convert uploads into base64 previews for immediate client rendering.

## 🤝 Contributing

- Fork the repository, create a feature branch (`git checkout -b feature/your-change`), and keep commits scoped and descriptive.
- Run `npm run lint` and verify the app against your Appwrite instance before opening a pull request.
- Follow the established feature-folder conventions, reuse shadcn/ui primitives, and document any new environment variables or Appwrite requirements in this README.
- Submit a pull request with a clear summary, screenshots where relevant, and note any manual steps testers should perform.
