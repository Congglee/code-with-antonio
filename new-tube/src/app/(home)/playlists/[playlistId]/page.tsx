import { DEFAULT_LIMIT } from "@/constants";
import VideosView from "@/modules/playlists/ui/views/videos-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface PlaylistDetailsProps {
  params: Promise<{ playlistId: string }>;
}

export default async function PlaylistDetails({
  params,
}: PlaylistDetailsProps) {
  const { playlistId } = await params;

  void trpc.playlists.getVideos.prefetchInfinite({
    playlistId,
    limit: DEFAULT_LIMIT,
  });
  void trpc.playlists.getOne.prefetch({
    id: playlistId,
  });

  return (
    <HydrateClient>
      <VideosView playlistId={playlistId} />
    </HydrateClient>
  );
}
