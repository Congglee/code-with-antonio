"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AgentIdFilter from "@/modules/meetings/ui/components/agent-id-filter";
import MeetingsSearchFilter from "@/modules/meetings/ui/components/meetings-search-filter";
import NewMeetingDialog from "@/modules/meetings/ui/components/new-meeting-dialog";
import StatusFilter from "@/modules/meetings/ui/components/status-filter";
import { MeetingStatus } from "@/modules/meetings/types";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";

interface MeetingsListHeaderProps {
  search: string;
  status: MeetingStatus | null;
  agentId: string;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: MeetingStatus | null) => void;
  onAgentIdChange: (agentId: string) => void;
  onClear: () => void;
}

export default function MeetingsListHeader({
  search,
  status,
  agentId,
  onSearchChange,
  onStatusChange,
  onAgentIdChange,
  onClear,
}: MeetingsListHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!search || !!status || !!agentId;

  return (
    <>
      <NewMeetingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col px-4 py-4 md:px-8 gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center p-1 gap-x-2">
            <MeetingsSearchFilter value={search} onChange={onSearchChange} />
            <StatusFilter
              value={status ?? ""}
              onChange={(value) => onStatusChange(value)}
            />
            <AgentIdFilter value={agentId} onChange={onAgentIdChange} />
            {isAnyFilterModified && (
              <Button variant="outline" size="sm" onClick={onClear}>
                <XCircleIcon className="size-4" />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
