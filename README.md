# Code with Antonio - Tutorial Projects Collection

This repository contains four full-stack web applications built following tutorials from the [Code with Antonio YouTube channel](https://www.youtube.com/@codewithantonio). Each project demonstrates modern web development practices using Next.js 14/15, TypeScript, and various cutting-edge technologies.

## 🚀 Projects Overview

### 1. Meet AI 🤖

**Location:** `meet-ai/`

An AI-powered video calling SaaS where real-time agents join your call, generate summaries and transcripts, store recordings, and enable post-call Q&A with meeting-aware chat.

#### ✨ Features

- **AI-powered Calls**: Real-time AI agents in meetings
- **Custom Agents**: Role-specific instructions and behaviors
- **Summaries & Transcripts**: Background processing and storage
- **Recordings**: Call recording playback
- **Transcript Search**: Highlighted search across the entire call
- **Meeting History & Statuses**: Upcoming, processing, completed
- **Post-call Q&A**: Chat that understands the meeting context
- **Subscriptions**: Free trial limits and upgrade flow
- **Responsive UI**: Optimized for mobile and desktop

#### 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19
- **Auth**: Better Auth (@polar-sh/better-auth)
- **Payments**: Polar
- **Database**: Neon Postgres + Drizzle ORM
- **Realtime**: Stream Video SDK + Stream Chat SDK
- **Background Jobs**: Inngest
- **Full-stack Types**: tRPC + TanStack Query
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Utilities**: Zod, date-fns, lucide-react, react-markdown, humanize-duration, Recharts

#### 🚀 Quick Start

```bash
cd meet-ai
npm install

# 1) Configure environment variables in .env
# Database
DATABASE_URL="postgres://user:password@host:port/db"

# Social auth (optional)
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Polar (payments)
POLAR_ACCESS_TOKEN="..." # sandbox token for local dev

# Stream (video & chat)
NEXT_PUBLIC_STREAM_VIDEO_API_KEY="..."
STREAM_VIDEO_SECRET_KEY="..."
NEXT_PUBLIC_STREAM_CHAT_API_KEY="..."
STREAM_CHAT_API_SECRET="..."

# 2) Push database schema
npm run db:push

# 3) Run the app
npm run dev

# (Optional) Expose webhook locally
npm run dev:webhook
```

---

### 2. Finance SaaS Platform 💰

**Location:** `finance-saas-platform/`

A comprehensive financial management application that allows users to track expenses, manage accounts, and visualize financial data.

#### ✨ Features

- **Account Management**: Create and manage multiple financial accounts
- **Transaction Tracking**: Record income and expenses with categorization
- **Data Visualization**: Interactive charts and analytics using Recharts
- **CSV Import/Export**: Bulk transaction management with Papa Parse
- **Real-time Updates**: Live data synchronization with React Query
- **Responsive Design**: Mobile-first UI with Tailwind CSS

#### 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: Clerk Auth
- **Database**: PostgreSQL with Drizzle ORM
- **Hosting**: Neon Database
- **API**: Hono.js for backend routes
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **File Processing**: React Papa Parse

#### 🚀 Quick Start

```bash
cd finance-saas-platform
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev
```

---

### 3. Jira Clone 📋

**Location:** `jira-clone/`

A project management application inspired by Jira, featuring workspaces, projects, tasks, and team collaboration tools.

#### ✨ Features

- **Workspace Management**: Create and manage multiple workspaces
- **Project Organization**: Organize work into projects with custom settings
- **Task Management**: Create, edit, and track tasks with different statuses
- **Drag & Drop**: Intuitive task management with Hello Pangea DND
- **Team Collaboration**: Invite members and manage permissions
- **Calendar View**: Task scheduling with React Big Calendar
- **Analytics Dashboard**: Project insights and progress tracking
- **Real-time Updates**: Live collaboration features

#### 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Backend**: Appwrite (BaaS)
- **API**: Hono.js
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **Drag & Drop**: @hello-pangea/dnd
- **Calendar**: React Big Calendar
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **URL State**: nuqs for URL state management

#### 🚀 Quick Start

```bash
cd jira-clone
npm install
npm run dev
```

---

### 4. NextAuth v5 Tutorial 🔐

**Location:** `next-auth-v5/`

A comprehensive authentication system showcasing NextAuth.js v5 (Auth.js) with advanced security features.

#### ✨ Features

- **Multiple Auth Providers**: Email/Password, Google, GitHub OAuth
- **Email Verification**: Secure account verification system
- **Two-Factor Authentication**: Enhanced security with 2FA
- **Password Reset**: Secure password recovery flow
- **Role-Based Access**: Admin and user role management
- **Session Management**: Secure JWT-based sessions
- **Protected Routes**: Route-level authentication guards
- **Account Linking**: Connect multiple auth providers
- **Security Features**: Rate limiting, CSRF protection

#### 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **Email Service**: Resend
- **Forms**: React Hook Form + Zod validation
- **Encryption**: bcryptjs for password hashing
- **Database Adapter**: Prisma Adapter for NextAuth

#### 🚀 Quick Start

```bash
cd next-auth-v5
npm install
npx prisma generate
npx prisma db push
npm run dev
```

## 🎯 Learning Objectives

These projects cover essential modern web development concepts:

- **Full-Stack Development**: Complete applications with frontend and backend
- **Authentication & Authorization**: Secure user management systems
- **Database Design**: Relational database modeling and management
- **API Development**: RESTful APIs with type safety
- **State Management**: Client and server state handling
- **UI/UX Design**: Modern, responsive user interfaces
- **Real-time Features**: Live updates and collaboration
- **File Handling**: Upload, processing, and management
- **Data Visualization**: Charts and analytics
- **Testing & Deployment**: Production-ready applications

## 🛡️ Security Features

All projects implement modern security practices:

- **Input Validation**: Zod schemas for type-safe validation
- **Authentication**: Secure user authentication flows
- **Authorization**: Role-based access control
- **CSRF Protection**: Cross-site request forgery prevention
- **SQL Injection Prevention**: ORM-based database queries
- **Password Security**: Proper hashing and salting
- **Session Management**: Secure JWT handling

## 📚 Resources

- **YouTube Channel**: [Code with Antonio](https://www.youtube.com/@codewithantonio)
- **Documentation**: Each project includes detailed setup instructions
- **Community**: Join the Discord community for support and discussions

## 🤝 Contributing

These projects are for educational purposes. Feel free to:

- Fork and experiment
- Report issues
- Suggest improvements
- Share your learning journey

## 📄 License

These projects are created for educational purposes following Code with Antonio tutorials. Please respect the original creator's work and licensing terms.

---

**Happy Coding! 🚀**

_Built with ❤️ following Code with Antonio tutorials_
