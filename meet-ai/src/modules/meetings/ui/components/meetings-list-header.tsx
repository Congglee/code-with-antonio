"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";
import AgentIdFilter from "@/modules/meetings/ui/components/agent-id-filter";
import MeetingsSearchFilter from "@/modules/meetings/ui/components/meetings-search-filter";
import NewMeetingDialog from "@/modules/meetings/ui/components/new-meeting-dialog";
import StatusFilter from "@/modules/meetings/ui/components/status-filter";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";

export default function MeetingsListHeader() {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({ status: null, agentId: "", search: "", page: DEFAULT_PAGE });
  };

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
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
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
