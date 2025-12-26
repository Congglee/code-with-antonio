# Meet AI - UI Template

<div align="center">

  <h3 align="center">Meet AI UI / UX Template</h3>

  <p align="center">
    A modern Front-end UI/UX reference implementation of an Intelligent Video Conferencing Platform.
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

This repository (`@meet-ai-ui`) is strictly a **Front-end UI/UX Template**.

It serves as a static design reference and a collection of reusable components for a video meeting application. All backend connectivity, real-time video logic (WebRTC), business logic, and API integrations have been **intentionally removed**.

- **❌ No Backend:** No server, database, or API calls.
- **❌ No Real-time Video/Audio:** The video grids are UI mockups; there is no actual WebRTC or streaming implementation.
- **✅ Pure UI/UX:** Focuses on the visual structure, meeting room layouts, dashboard interactions, and component composition.

This project is ideal for developers looking for:

- A high-quality **UI reference** for Next.js 15 and Tailwind CSS v4.
- **Component examples** (Video grids, Control bars, Settings modals, Chat interfaces).
- A **starter template** to build their own video conferencing or AI meeting app.

---

## 🌟 Features (Visual Only)

Although the logic is stripped, the visual fidelity is fully preserved:

- **Modern Dashboard:**
  - Upcoming meetings list.
  - Recordings library layout.
  - Analytics charts (using `recharts`).
- **Meeting Room UI:**
  - Responsive video grid layouts.
  - Meeting controls (Mute, Camera, Screen Share buttons).
  - Sidebar for Participants and Chat.
  - Resizable panels (using `react-resizable-panels`).
- **AI Integration UI:**
  - Meeting summary & transcript views (using `react-markdown`).
  - Chat interfaces for AI assistants.
- **Interactive Components:**
  - **Command Palette:** Quick navigation (using `cmdk`).
  - **Authentication Flows:** Login, OTP input screens (using `input-otp`).
  - **Modals & Dialogs:** Schedule meetings, device settings.
  - **Carousels:** Feature showcases (using `embla-carousel-react`).

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Core:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Primitive:** [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Data Display:** [Tanstack Table](https://tanstack.com/table/v8) & [Recharts](https://recharts.org/)
- **Avatars:** [DiceBear](https://www.dicebear.com/)

## 🚀 Getting Started

To run this UI template locally:

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository** (if you haven't already)

   ```bash
   git clone <your-repo-url>
   cd meet-ai-ui
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
meet-ai-ui/
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Shared UI components (Buttons, Dialogs, etc.)
│   ├── features/       # Feature-based UI modules (Meeting, Auth, Dashboard)
│   ├── hooks/          # Custom UI hooks
│   └── lib/            # Utility functions
├── public/             # Static assets
└── ...config files
```

## 🤝 Contributing

This is a template repository. If you find visual bugs or want to improve the component accessibility/design, feel free to open a Pull Request.
