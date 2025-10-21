import { PlaylistGetManyOutput } from "@/modules/playlists/types";
import PlaylistInfo, {
  PlaylistInfoSkeleton,
} from "@/modules/playlists/ui/components/playlist-grid-card/playlist-info";
import PlaylistThumbnail, {
  PlaylistThumbnailSkeleton,
} from "@/modules/playlists/ui/components/playlist-grid-card/playlist-thumbnail";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import Link from "next/link";

interface PlaylistGridCardProps {
  data: PlaylistGetManyOutput["items"][number];
}

export default function PlaylistGridCard({ data }: PlaylistGridCardProps) {
  return (
    <Link prefetch href={`/playlists/${data.id}`}>
      <div className="group flex w-full flex-col gap-2">
        <PlaylistThumbnail
          title={data.name}
          imageUrl={data.thumbnailUrl ?? THUMBNAIL_FALLBACK}
          videoCount={data.videoCount}
        />
        <PlaylistInfo data={data} />
      </div>
    </Link>
  );
}

export function PlaylistGridCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2">
      <PlaylistThumbnailSkeleton />
      <PlaylistInfoSkeleton />
    </div>
  );
}
