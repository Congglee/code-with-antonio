import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import GeneratedAvatar from "@/components/generated-avatar";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface TranscriptProps {
  meetingId: string;
}

export default function Transcript({ meetingId }: TranscriptProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // UI-only template: mock transcript data.
  const transcript = [
    {
      id: "t1",
      user: { name: "Alex (mock)" },
      start_ts: 15,
      text: "Let's align on the agenda and key milestones.",
    },
    {
      id: "t2",
      user: { name: "Meet.AI (mock)" },
      start_ts: 42,
      text: "Action items: finalize UI copy and confirm owners.",
    },
  ];

  const filteredData = transcript.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border px-4 py-5 flex flex-col gap-y-4 w-full">
      <p className="text-sm font-medium">Transcript</p>
      <p className="text-xs text-muted-foreground">
        UI-only template (mock) · meetingId: {meetingId}
      </p>
      <div className="relative">
        <Input
          placeholder="Search transcript..."
          className="pl-7 h-9 w-[240px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
      </div>
      <ScrollArea>
        <div className="flex flex-col gap-y-4">
          {filteredData.map((item) => {
            return (
              <div
                className="flex flex-col gap-y-2 hover:bg-muted p-4 rounded-md border"
                key={item.id}
              >
                <div className="flex gap-x-2 items-center ">
                  <GeneratedAvatar
                    seed={item.user.name}
                    variant="initials"
                    className="size-6"
                  />
                  <p className="text-sm font-medium">{item.user.name}</p>
                  <p className="text-sm text-blue-700 font-medium ">
                    {String(Math.floor(item.start_ts / 60)).padStart(2, "0")}:
                    {String(item.start_ts % 60).padStart(2, "0")}
                  </p>
                </div>
                <p className="text-sm text-neutral-700">{item.text}</p>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
