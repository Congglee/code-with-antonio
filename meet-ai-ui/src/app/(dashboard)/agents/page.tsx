"use client";

import AgentsListHeader from "@/modules/agents/ui/components/agents-list-header";
import AgentsView from "@/modules/agents/ui/views/agent-view";
import { DEFAULT_PAGE } from "@/constants";
import { useState } from "react";

export default function Agents() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(DEFAULT_PAGE);

  return (
    <>
      <AgentsListHeader
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(DEFAULT_PAGE);
        }}
        onClear={() => {
          setSearch("");
          setPage(DEFAULT_PAGE);
        }}
      />
      <AgentsView
        search={search}
        page={page}
        onPageChange={(next) => setPage(next)}
      />
    </>
  );
}
