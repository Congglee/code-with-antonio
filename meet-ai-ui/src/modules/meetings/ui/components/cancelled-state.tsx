import EmptyState from "@/components/empty-state";

export default function CancelledState() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-5 bg-white rounded-lg gap-y-8">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting is cancelled"
        description="This meeting has been cancelled."
      />
    </div>
  );
}
