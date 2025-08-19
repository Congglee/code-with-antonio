"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import ActiveState from "@/modules/meetings/ui/components/active-state";
import CancelledState from "@/modules/meetings/ui/components/cancelled-state";
import MeetingIdViewHeader from "@/modules/meetings/ui/components/meeting-id-view-header";
import ProcessingState from "@/modules/meetings/ui/components/processing-state";
import UpcomingState from "@/modules/meetings/ui/components/upcoming-state";
import UpdateMeetingDialog from "@/modules/meetings/ui/components/update-meeting-dialog";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MeetingIdViewProps {
  meetingId: string;
}

export default function MeetingIdView({ meetingId }: MeetingIdViewProps) {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    "This will remove the meeting and all its data. This action cannot be undone."
  );

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (!ok) return;
    await removeMeeting.mutateAsync({ id: meetingId });
  };

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
        {isCompleted && <div>Completed</div>}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
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
