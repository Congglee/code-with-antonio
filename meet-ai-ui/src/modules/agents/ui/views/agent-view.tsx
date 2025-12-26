"use client";

import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { columns } from "@/modules/agents/ui/components/columns";
import DataPagination from "@/modules/agents/ui/components/data-pagination";
import DataTable from "@/components/data-table";
import { mockAgents } from "@/data/mock";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface AgentsViewProps {
  search?: string;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

export default function AgentsView({
  search: searchProp,
  page: pageProp,
  pageSize = 10,
  onPageChange,
}: AgentsViewProps) {
  const router = useRouter();

  const [searchState, setSearchState] = useState(searchProp ?? "");
  const [pageState, setPageState] = useState(pageProp ?? 1);

  useEffect(() => {
    if (searchProp !== undefined) setSearchState(searchProp);
  }, [searchProp]);

  useEffect(() => {
    if (pageProp !== undefined) setPageState(pageProp);
  }, [pageProp]);

  const search = searchProp ?? searchState;
  const page = pageProp ?? pageState;

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return mockAgents.filter((agent) =>
      normalized ? agent.name.toLowerCase().includes(normalized) : true
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const items = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handlePageChange = (nextPage: number) => {
    if (onPageChange) return onPageChange(nextPage);
    setPageState(nextPage);
  };

  return (
    <div className="flex flex-col flex-1 px-4 pb-4 md:px-8 gap-y-4">
      <DataTable
        data={items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={safePage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {items.length === 0 && (
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
