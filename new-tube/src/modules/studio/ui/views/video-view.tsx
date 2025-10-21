import FormSection from "@/modules/studio/ui/sections/form-section";

interface VideoViewProps {
  videoId: string;
}

export default function VideoView({ videoId }: VideoViewProps) {
  return (
    <div className="max-w-screen-lg px-4 py-2.5">
      <FormSection videoId={videoId} />
    </div>
  );
}
