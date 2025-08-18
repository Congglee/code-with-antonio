"use client";

import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import DataTable from "@/components/data-table";
import { columns } from "@/modules/meetings/ui/components/columns";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import DataPagination from "@/modules/agents/ui/components/data-pagination";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";

export default function MeetingsView() {
  const trpc = useTRPC();
  const router = useRouter();

  const [filters, setFilters] = useMeetingsFilters();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="flex flex-col flex-1 px-4 pb-4 md:px-8 gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
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
