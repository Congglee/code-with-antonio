import { HydrateClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import SearchView from "@/modules/search/ui/views/search-view";

export const dynamic = "force-dynamic";

interface SearchPageProps {
  searchParams: Promise<{
    query: string | undefined;
    categoryId: string | undefined;
  }>;
}

export default async function Search({ searchParams }: SearchPageProps) {
  const { query, categoryId } = await searchParams;

  void trpc.categories.getMany.prefetch();
  void trpc.search.getMany.prefetchInfinite({
    limit: DEFAULT_LIMIT,
    query,
    categoryId,
  });

  return (
    <HydrateClient>
      <SearchView query={query} categoryId={categoryId} />
    </HydrateClient>
  );
}
