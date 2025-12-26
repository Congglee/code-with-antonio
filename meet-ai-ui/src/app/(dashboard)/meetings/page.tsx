"use client";

import MeetingsListHeader from "@/modules/meetings/ui/components/meetings-list-header";
import MeetingsView from "@/modules/meetings/ui/views/meetings-view";
import { DEFAULT_PAGE } from "@/constants";
import { useState } from "react";
import { MeetingStatus } from "@/modules/meetings/types";

export default function Meetings() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<MeetingStatus | null>(null);
  const [agentId, setAgentId] = useState("");
  const [page, setPage] = useState(DEFAULT_PAGE);

  return (
    <>
      <MeetingsListHeader
        search={search}
        status={status}
        agentId={agentId}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(DEFAULT_PAGE);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(DEFAULT_PAGE);
        }}
        onAgentIdChange={(value) => {
          setAgentId(value);
          setPage(DEFAULT_PAGE);
        }}
        onClear={() => {
          setSearch("");
          setStatus(null);
          setAgentId("");
          setPage(DEFAULT_PAGE);
        }}
      />
      <MeetingsView
        search={search}
        status={status}
        agentId={agentId}
        page={page}
        onPageChange={(next) => setPage(next)}
      />
    </>
  );
}
