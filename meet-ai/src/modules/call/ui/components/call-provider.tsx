import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import CallConnect from "@/modules/call/ui/components/call-connect";
import { LoaderIcon } from "lucide-react";

interface CallProviderProps {
  meetingId: string;
  meetingName: string;
}

export default function CallProvider({
  meetingId,
  meetingName,
}: CallProviderProps) {
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div className="flex items-center justify-center h-screen bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="text-white size-6 animate-apn" />
      </div>
    );
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generateAvatarUri({ seed: data.user.name, variant: "initials" })
      }
    />
  );
}
