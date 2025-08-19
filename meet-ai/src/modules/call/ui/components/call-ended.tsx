import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallEnded() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="flex items-center justify-center flex-1 px-4 py-4">
        <div className="flex flex-col items-center justify-center p-10 rounded-lg shadow-sm gap-y-6 bg-background">
          <div className="flex flex-col text-center gap-y-2">
            <h6 className="text-lg font-medium">You have ended the call</h6>
            <p className="text-sm">Summary will appear in a few minutes.</p>
          </div>
          <Button asChild>
            <Link href="/meetings">Back to meetings</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
