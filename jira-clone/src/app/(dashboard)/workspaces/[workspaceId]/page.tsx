import WorkspaceClient from "@/app/(dashboard)/workspaces/[workspaceId]/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

export default async function WorkSpacePage() {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  return <WorkspaceClient />;
}
