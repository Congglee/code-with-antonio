import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon } from "lucide-react";
import Link from "next/link";
import { VideoIcon } from "lucide-react";

interface UpcomingStateProps {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export default function UpcomingState({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: UpcomingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-5 bg-white rounded-lg gap-y-8">
      <EmptyState
        image="/upcoming.svg"
        title="Not Started yet"
        description="This meeting is scheduled for a future date and time. Please check back later."
      />

      <div className="flex flex-col-reverse items-center w-full gap-2 lg:flex-row lg:justify-center">
        <Button
          variant="secondary"
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
          disabled={isCancelling}
        >
          <BanIcon />
          Cancel Meeting
        </Button>

        <Button asChild className="w-full lg:w-auto" disabled={isCancelling}>
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
}
