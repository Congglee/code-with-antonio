"use client";

import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import DataTable from "@/components/data-table";
import { mockMeetings } from "@/data/mock";
import { columns } from "@/modules/meetings/ui/components/columns";
import { useRouter } from "next/navigation";
import DataPagination from "@/modules/agents/ui/components/data-pagination";
import { useEffect, useMemo, useState } from "react";
import type { MeetingStatus } from "@/data/mock";

interface MeetingsViewProps {
  search?: string;
  status?: MeetingStatus | null;
  agentId?: string;
  page?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
}

export default function MeetingsView({
  search: searchProp,
  status: statusProp = null,
  agentId: agentIdProp = "",
  page: pageProp,
  pageSize = 10,
  onPageChange,
}: MeetingsViewProps) {
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
    return mockMeetings.filter((meeting) => {
      const matchesSearch = normalized
        ? meeting.name.toLowerCase().includes(normalized)
        : true;
      const matchesStatus = statusProp ? meeting.status === statusProp : true;
      const matchesAgent = agentIdProp ? meeting.agent.id === agentIdProp : true;
      return matchesSearch && matchesStatus && matchesAgent;
    });
  }, [search, statusProp, agentIdProp]);

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
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={safePage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {items.length === 0 && (
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
