import GeneratedAvatar from "@/components/generated-avatar";
import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
} from "@/components/ui/command";
import { mockAgents, mockMeetings } from "@/data/mock";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DashboardCommand({
  open,
  setOpen,
}: DashboardCommandProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const normalized = search.trim().toLowerCase();

  const meetings = mockMeetings.filter((m) =>
    normalized ? m.name.toLowerCase().includes(normalized) : true
  );

  const agents = mockAgents.filter((a) =>
    normalized ? a.name.toLowerCase().includes(normalized) : true
  );

  return (
    <CommandResponsiveDialog
      shouldFilter={false}
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput
        placeholder="Find a meeting or agent..."
        value={search}
        onValueChange={(value) => {
          setSearch(value);
        }}
      />
      <CommandList>
        <CommandGroup heading="Meetings">
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No meetings found
            </span>
          </CommandEmpty>
          {meetings.map((meeting) => (
            <CommandItem
              onSelect={() => {
                setOpen(false);
                router.push(`/meetings/${meeting.id}`);
              }}
              key={meeting.id}
            >
              {meeting.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Agents">
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No agents found
            </span>
          </CommandEmpty>
          {agents.map((agent) => (
            <CommandItem
              onSelect={() => {
                setOpen(false);
                router.push(`/agents/${agent.id}`);
              }}
              key={agent.id}
            >
              <GeneratedAvatar
                seed={agent.name}
                variant="botttsNeutral"
                className="size-5"
              />
              {agent.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandResponsiveDialog>
  );
}
