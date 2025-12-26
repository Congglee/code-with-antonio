# Jira Clone - UI Template

<div align="center">

  <h3 align="center">Jira Clone UI / UX Template</h3>

  <p align="center">
    A comprehensive Front-end UI/UX reference implementation of a Project Management System.
    <br />
    <br />
    <a href="#getting-started"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>

---

## ⚠️ IMPORTANT: UI-Only Architecture

**Please read this before using this codebase.**

This repository (`@jira-clone-ui`) is strictly a **Front-end UI/UX Template**.

It serves as a static design reference and a collection of reusable components. All backend connectivity, business logic, state management, and API integrations have been **intentionally removed**.

- **❌ No Backend:** There is no server, database connection, or API handling.
- **❌ No Business Logic:** Form submissions, data mutation, and complex state flows are mocked or removed.
- **✅ Pure UI/UX:** The focus is entirely on the visual structure, layout, animations, and component composition.

This project is ideal for developers looking for:

- A high-quality **UI reference** for Next.js and Tailwind CSS.
- **Component examples** (Kanban boards, Data tables, Modals, Forms).
- A **starter template** to build their own backend logic on top of a professional-grade frontend.

---

## 🌟 Features (Visual Only)

Although the logic is stripped, the visual fidelity is fully preserved:

- **Modern Dashboard UI:** Responsive layouts with sidebar navigation and headers.
- **Workspaces & Projects:** Visual structures for organizing content.
- **Task Management Views:**
  - **Kanban Board:** Drag-and-drop UI implementation (using `@hello-pangea/dnd`).
  - **Data Table:** Advanced table layouts (using `@tanstack/react-table`).
  - **Calendar:** Calendar view interfaces (using `react-big-calendar`).
- **Interactive Components:**
  - **Modals & Dialogs:** Create/Edit task forms, workspace settings.
  - **Dropdowns & Popovers:** Context menus and filters.
  - **Charts:** Visual data representation (using `recharts`).
- **Theming:** Clean, modern aesthetic using Tailwind CSS.

## 🛠 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Primitive:** [Radix UI](https://www.radix-ui.com/) (Headless UI components)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Data Display:** [Tanstack Table](https://tanstack.com/table/v8)
- **Drag & Drop:** [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)

## 🚀 Getting Started

To run this UI template locally:

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository** (if you haven't already)

   ```bash
   git clone <your-repo-url>
   cd jira-clone-ui
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```bash
jira-clone-ui/
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Shared UI components (Buttons, Inputs, etc.)
│   ├── features/       # Feature-based UI modules (Tasks, Projects, Workspaces)
│   ├── hooks/          # Custom UI hooks
│   └── lib/            # Utility functions
├── public/             # Static assets
└── ...config files
```

## 🤝 Contributing

This is a template repository. If you find visual bugs or want to improve the component accessibility/design, feel free to open a Pull Request.
