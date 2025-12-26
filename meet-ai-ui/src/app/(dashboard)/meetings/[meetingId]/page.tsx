import MeetingIdView from "@/modules/meetings/ui/views/meeting-id-view";

interface MeetingDetailsProps {
  params: Promise<{ meetingId: string }>;
}

export default async function MeetingDetails({ params }: MeetingDetailsProps) {
  const { meetingId } = await params;
  return <MeetingIdView meetingId={meetingId} />;
}
