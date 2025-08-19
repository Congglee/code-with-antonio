import EmptyState from "@/components/empty-state";

export default function ProcessingState() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-5 bg-white rounded-lg gap-y-8">
      <EmptyState
        image="/processing.svg"
        title="Meeting is completed"
        description="This meeting has been completed, thank you for your participation, you will receive a summary soon."
      />
    </div>
  );
}
