import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface ActiveStateProps {
  meetingId: string;
}

export default function ActiveState({ meetingId }: ActiveStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-5 bg-white rounded-lg gap-y-8">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting is active"
        description="This meeting is currently in progress."
      />

      <div className="flex flex-col-reverse items-center w-full gap-2 lg:flex-row lg:justify-center">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
}
