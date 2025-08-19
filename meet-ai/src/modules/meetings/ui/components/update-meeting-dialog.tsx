import ResponsiveDialog from "@/components/responsive-dialog";
import { MeetingGetOne } from "@/modules/meetings/types";
import MeetingForm from "@/modules/meetings/ui/components/meeting-form";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingGetOne;
}

export default function UpdateMeetingDialog({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Meeting"
      description="Edit the meeting details."
    >
      <MeetingForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}
