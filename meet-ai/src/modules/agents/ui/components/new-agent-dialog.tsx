import ResponsiveDialog from "@/components/responsive-dialog";
import AgentForm from "@/modules/agents/ui/components/agent-form";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewAgentDialog({
  open,
  onOpenChange,
}: NewAgentDialogProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="New Agent"
      description="Create a new agent to automate tasks and workflows."
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}
