import CommandSelect from "@/components/command-select";
import GeneratedAvatar from "@/components/generated-avatar";
import { mockAgents } from "@/data/mock";
import { useState } from "react";

interface AgentIdFilterProps {
  value: string;
  onChange: (agentId: string) => void;
}

export default function AgentIdFilter({ value, onChange }: AgentIdFilterProps) {
  const [agentSearch, setAgentSearch] = useState("");
  const normalized = agentSearch.trim().toLowerCase();
  const agents = mockAgents.filter((a) =>
    normalized ? a.name.toLowerCase().includes(normalized) : true
  );

  return (
    <CommandSelect
      className="h-9"
      placeholder="Agent"
      options={agents.map((agent) => ({
        id: agent.id,
        value: agent.id,
        children: (
          <div className="flex items-center gap-x-2">
            <GeneratedAvatar
              seed={agent.name}
              variant="botttsNeutral"
              className="size-6"
            />
            {agent.name}
          </div>
        ),
      }))}
      onSelect={(value) => onChange(value)}
      onSearch={setAgentSearch}
      value={value}
    />
  );
}
