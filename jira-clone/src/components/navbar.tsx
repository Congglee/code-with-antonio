"use client";

import MobileSidebar from "@/components/mobile-sidebar";
import ModeToggle from "@/components/mode-toggle";
import UserButton from "@/features/auth/components/user-button";
import { usePathname } from "next/navigation";

const pathnameMap = {
  tasks: {
    title: "All Tasks",
    description: "View all tasks here across all projects.",
  },
  projects: {
    title: "My Project",
    description: "View tasks that are part of your project here.",
  },
};

const defaultMap = {
  title: "Home",
  description: "Monitor all of your projects and tasks here.",
};

export default function Navbar() {
  const pathname = usePathname();
  const pathnameParts = pathname.split("/");
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

  const { title, description } = pathnameMap[pathnameKey] || defaultMap;

  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileSidebar />
      <div className="flex items-center gap-4">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
}
