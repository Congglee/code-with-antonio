"use client";

import ErrorState from "@/components/error-state";
import GeneratedAvatar from "@/components/generated-avatar";
import LoadingState from "@/components/loading-state";
import { Badge } from "@/components/ui/badge";
import { mockAgents } from "@/data/mock";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateAgentDialog } from "@/modules/agents/ui/components/update-agent-dialog";
import AgentIdViewHeader from "@/modules/agents/ui/views/agent-id-view-header";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AgentIdViewProps {
  agentId: string;
}

export default function AgentIdView({ agentId }: AgentIdViewProps) {
  const router = useRouter();

  const [updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

  const data = mockAgents.find((agent) => agent.id === agentId);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure you want to remove this agent?",
    "This action cannot be undone. All data related to this agent will be permanently deleted."
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    toast.success("Agent removed (mock)", {
      description: "This is a UI-only template. No API request was made.",
    });
    router.push("/agents");
  };

  if (!data) {
    return (
      <ErrorState
        title="Agent not found"
        description="This item is missing from mock data."
      />
    );
  }

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialogOpen}
        onOpenChange={setUpdateAgentDialogOpen}
        initialValues={data}
      />
      <div className="flex flex-col flex-1 px-4 py-4 md:px-8 gap-y-4">
        <AgentIdViewHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialogOpen(true)}
          onRemove={handleRemoveAgent}
        />
        <div className="bg-white border rounded-lg">
          <div className="flex flex-col col-span-5 px-4 py-5 gap-y-5">
            <div className="flex items-center gap-x-3">
              <GeneratedAvatar
                variant="botttsNeutral"
                seed={data.name}
                className="size-10"
              />
              <h2 className="text-2xl font-medium">{data.name}</h2>
            </div>
            <Badge
              variant="outline"
              className="flex items-center gap-x-2 [&>svg]:size-4"
            >
              <VideoIcon className="text-blue-700" />
              {data.meetingCount}{" "}
              {data.meetingCount === 1 ? "meeting" : "meetings"}
            </Badge>
            <div className="flex flex-col gap-y-4">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-neutral-800">{data.instructions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function AgentIdViewLoading() {
  return (
    <LoadingState
      title="Loading Agent"
      description="Please wait while we load your agents."
    />
  );
}

export function AgentIdViewError() {
  return (
    <ErrorState
      title="Error loading Agent"
      description="Something went wrong, try again!"
    />
  );
}
