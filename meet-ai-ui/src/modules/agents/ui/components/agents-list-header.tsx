"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AgentsSearchFilter from "@/modules/agents/ui/components/agents-search-filter";
import NewAgentDialog from "@/modules/agents/ui/components/new-agent-dialog";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";

interface AgentsListHeaderProps {
  search: string;
  onSearchChange: (search: string) => void;
  onClear: () => void;
}

export default function AgentsListHeader({
  search,
  onSearchChange,
  onClear,
}: AgentsListHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAnyFilterModified = !!search;

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="flex flex-col px-4 py-4 md:px-8 gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
            New Agent
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center p-1 gap-x-2">
            <AgentsSearchFilter value={search} onChange={onSearchChange} />
            {isAnyFilterModified && (
              <Button variant="outline" size="sm" onClick={onClear}>
                <XCircleIcon />
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
