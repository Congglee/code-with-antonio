"use client";

import { Button } from "@/components/ui/button";
import NewMeetingDialog from "@/modules/meetings/ui/components/new-meeting-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export default function MeetingsListHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        <div className="flex items-center p-1 gap-x-2">TODO: Filters</div>
      </div>
    </>
  );
}
