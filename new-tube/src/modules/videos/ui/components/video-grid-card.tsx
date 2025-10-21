import { VideoGetManyOutput } from "@/modules/videos/types";
import VideoInfo, {
  VideoInfoSkeleton,
} from "@/modules/videos/ui/components/video-info";
import VideoThumbnail, {
  VideoThumbnailSkeleton,
} from "@/modules/videos/ui/components/video-thumbnail";
import Link from "next/link";

interface VideoGridCardProps {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
}

export default function VideoGridCard({ data, onRemove }: VideoGridCardProps) {
  return (
    <div className="group flex w-full flex-col gap-2">
      <Link prefetch href={`/videos/${data.id}`}>
        <VideoThumbnail
          imageUrl={data.thumbnailUrl}
          previewUrl={data.previewUrl}
          title={data.title}
          duration={data.duration}
        />
      </Link>
      <VideoInfo data={data} onRemove={onRemove} />
    </div>
  );
}

export function VideoGridCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2">
      <VideoThumbnailSkeleton />
      <VideoInfoSkeleton />
    </div>
  );
}
