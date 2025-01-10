import ProjectClient from "@/app/(dashboard)/workspaces/[workspaceId]/projects/[projectId]/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function ProjectPage() {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return <ProjectClient />;
}
