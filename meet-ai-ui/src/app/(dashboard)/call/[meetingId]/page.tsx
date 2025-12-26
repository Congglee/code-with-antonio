import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CallMeetingPageProps {
  params: Promise<{
    meetingId: string;
  }>;
}

export default async function CallMeetingPage({ params }: CallMeetingPageProps) {
  const { meetingId } = await params;
  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <div className="max-w-xl w-full flex flex-col gap-y-6">
        <EmptyState
          image="/globe.svg"
          title="Video call (mock)"
          description="This is a UI-only template. The real call experience (Stream, auth, token, etc.) was removed."
        />
        <Button asChild className="w-full">
          <Link href={`/meetings/${meetingId}`}>Back to meeting</Link>
        </Button>
      </div>
    </div>
  );
}
