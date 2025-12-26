import AgentIdView from "@/modules/agents/ui/views/agent-id-view";

interface AgentDetailsProps {
  params: Promise<{ agentId: string }>;
}

export default async function AgentDetails({ params }: AgentDetailsProps) {
  const { agentId } = await params;
  return <AgentIdView agentId={agentId} />;
}
