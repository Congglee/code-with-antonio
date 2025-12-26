import GeneratedAvatar from "@/components/generated-avatar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface ChatUIProps {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string | undefined;
}

export default function ChatUI({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: ChatUIProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    Array<{ id: string; sender: string; text: string }>
  >([
    {
      id: "m1",
      sender: "Meet.AI (mock)",
      text: `Ask anything about \"${meetingName}\".`,
    },
  ]);

  const onSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: `m_${Date.now()}`, sender: userName || userId, text: trimmed },
    ]);
    setMessage("");
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Ask AI</p>
            <p className="text-xs text-muted-foreground">
              UI-only template: chat is mocked (no Stream, no backend) · meetingId:{" "}
              {meetingId}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {userImage ? (
              <Avatar className="size-7">
                <AvatarImage src={userImage} />
              </Avatar>
            ) : (
              <GeneratedAvatar
                seed={userName || userId}
                variant="initials"
                className="size-7"
              />
            )}
          </div>
        </div>
      </div>

      <ScrollArea className="max-h-[calc(100vh-23rem)]">
        <div className="p-4 flex flex-col gap-y-3">
          {messages.map((m) => (
            <div key={m.id} className="rounded-md border p-3">
              <p className="text-xs text-muted-foreground">{m.sender}</p>
              <p className="text-sm">{m.text}</p>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") onSend();
          }}
        />
        <Button type="button" onClick={onSend}>
          Send
        </Button>
      </div>
    </div>
  );
}
