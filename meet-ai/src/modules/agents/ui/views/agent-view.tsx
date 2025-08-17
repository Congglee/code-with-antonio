"use client";

import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useAgentsFilters } from "@/modules/agents/hooks/use-agents-filters";
import { columns } from "@/modules/agents/ui/components/columns";
import DataPagination from "@/modules/agents/ui/components/data-pagination";
import DataTable from "@/modules/agents/ui/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function AgentsView() {
  const [filters, setFilters] = useAgentsFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <div className="flex flex-col flex-1 px-4 pb-4 md:px-8 gap-y-4">
      <DataTable data={data.items} columns={columns} />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  );
}

export function AgentsViewLoading() {
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we load your agents."
    />
  );
}

export function AgentsViewError() {
  return (
    <ErrorState
      title="Error loading Agents"
      description="Something went wrong, try again!"
    />
  );
}
