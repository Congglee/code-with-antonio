"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { mockMeetings } from "@/data/mock";
import { useConfirm } from "@/hooks/use-confirm";
import ActiveState from "@/modules/meetings/ui/components/active-state";
import CancelledState from "@/modules/meetings/ui/components/cancelled-state";
import CompletedState from "@/modules/meetings/ui/components/completed-state";
import MeetingIdViewHeader from "@/modules/meetings/ui/components/meeting-id-view-header";
import ProcessingState from "@/modules/meetings/ui/components/processing-state";
import UpcomingState from "@/modules/meetings/ui/components/upcoming-state";
import UpdateMeetingDialog from "@/modules/meetings/ui/components/update-meeting-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface MeetingIdViewProps {
  meetingId: string;
}

export default function MeetingIdView({ meetingId }: MeetingIdViewProps) {
  const router = useRouter();

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "This will remove the meeting and all its data. This action cannot be undone."
  );

  const data = mockMeetings.find((m) => m.id === meetingId);

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    toast.success("Meeting removed (mock)", {
      description: "This is a UI-only template. No API request was made.",
    });
    router.push("/meetings");
  };

  if (!data) {
    return (
      <ErrorState
        title="Meeting not found"
        description="This item is missing from mock data."
      />
    );
  }

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex flex-col flex-1 px-4 py-4 md:px-8 gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <CompletedState data={data} />}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && <UpcomingState meetingId={meetingId} />}
      </div>
    </>
  );
}

export function MeetingIdViewLoading() {
  return (
    <LoadingState
      title="Loading Meeting"
      description="Please wait while we load your meeting."
    />
  );
}

export function MeetingIdViewError() {
  return (
    <ErrorState
      title="Error loading Meeting"
      description="Something went wrong, try again!"
    />
  );
}
