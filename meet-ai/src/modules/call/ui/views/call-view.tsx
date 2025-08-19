"use client";

import ErrorState from "@/components/error-state";
import CallProvider from "@/modules/call/ui/components/call-provider";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface CallViewProps {
  meetingId: string;
}

export default function CallView({ meetingId }: CallViewProps) {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (data.status === "completed") {
    return (
      <div className="flex items-center justify-center h-screen">
        <ErrorState
          title="Meeting has ended"
          description="You can no longer join this meeting."
        />
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={data.name} />;
}
