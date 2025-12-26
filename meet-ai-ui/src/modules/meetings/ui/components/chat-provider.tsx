"use client";

import { mockUser } from "@/data/mock";
import ChatUI from "@/modules/meetings/ui/components/chat-ui";

interface ChatProviderProps {
  meetingId: string;
  meetingName: string;
}

export default function ChatProvider({
  meetingId,
  meetingName,
}: ChatProviderProps) {
  return (
    <ChatUI
      meetingId={meetingId}
      meetingName={meetingName}
      userId="mock_user"
      userName={mockUser.name}
      userImage={mockUser.image ?? ""}
    />
  );
}
