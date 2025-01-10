import WorkspaceSettingsClient from "@/app/(standalone)/workspaces/[workspaceId]/settings/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function WorkspaceSettingsPage() {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return <WorkspaceSettingsClient />;
}
