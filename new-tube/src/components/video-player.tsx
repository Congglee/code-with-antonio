"use client";

import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  playbackId?: string | null | undefined;
  thumbnailUrl?: string | null | undefined;
  autoPlay?: boolean;
  onPlay?: () => void;
}

export default function VideoPlayer({
  playbackId,
  thumbnailUrl,
  autoPlay,
  onPlay,
}: VideoPlayerProps) {
  return (
    <MuxPlayer
      playbackId={playbackId || ""}
      poster={thumbnailUrl || THUMBNAIL_FALLBACK}
      playerInitTime={0}
      autoPlay={autoPlay}
      thumbnailTime={0}
      className="w-full h-full object-cover"
      accentColor="#FF2056"
      onPlay={onPlay}
    />
  );
}

export function VideoPlayerSkeleton() {
  return <div className="aspect-video rounded-xl bg-black" />;
}
