import WorkspaceJoinClient from "@/app/(standalone)/workspaces/[workspaceId]/join/[inviteCode]/client";

export default function WorkspaceJoinPage() {
  return (
    <div className="w-full lg:max-w-xl">
      <WorkspaceJoinClient />
    </div>
  );
}
