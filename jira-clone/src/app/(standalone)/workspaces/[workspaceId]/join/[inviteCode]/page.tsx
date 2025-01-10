import WorkspaceJoinClient from "@/app/(standalone)/workspaces/[workspaceId]/join/[inviteCode]/client";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

interface WorkspaceJoinPageProps {
  params: {
    workspaceId: string;
  };
}

export default async function WorkspaceJoinPage({
  params,
}: WorkspaceJoinPageProps) {
  const user = await getCurrent();

  if (!user) {
    redirect("/");
  }

  return <WorkspaceJoinClient />;
}
