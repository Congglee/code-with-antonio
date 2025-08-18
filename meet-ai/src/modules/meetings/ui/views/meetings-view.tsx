"use client";

import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import DataTable from "@/components/data-table";
import { columns } from "@/modules/meetings/ui/components/columns";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function MeetingsView() {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div className="flex flex-col flex-1 px-4 pb-4 md:px-8 gap-y-4">
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first meeting"
          description="Schedule a meeting to start collaborating with your agents. Meetings can be used to discuss topics, share ideas, and interact with participants."
        />
      )}
    </div>
  );
}

export function MeetingsViewLoading() {
  return (
    <LoadingState
      title="Loading Meetings"
      description="Please wait while we load your meetings."
    />
  );
}

export function MeetingsViewError() {
  return (
    <ErrorState
      title="Error loading Meetings"
      description="Something went wrong, try again!"
    />
  );
}
