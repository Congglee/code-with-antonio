import CommandSelect from "@/components/command-select";
import GeneratedAvatar from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import NewAgentDialog from "@/modules/agents/ui/components/new-agent-dialog";
import { mockAgents } from "@/data/mock";
import { meetingsInsertSchema } from "@/modules/meetings/schemas";
import { MeetingGetOne } from "@/modules/meetings/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export default function MeetingForm({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) {
  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");
  const [pending, setPending] = useState(false);

  const normalized = agentSearch.trim().toLowerCase();
  const agents = mockAgents.filter((a) =>
    normalized ? a.name.toLowerCase().includes(normalized) : true
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agent?.id ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = pending;

  const onSubmit = form.handleSubmit(async (values) => {
    setPending(true);

    const payload = isEdit
      ? { id: initialValues?.id, ...values }
      : { ...values };

    console.log("[UI template] meeting form submit", payload);
    toast.success(isEdit ? "Meeting updated (mock)" : "Meeting created (mock)", {
      description: "This is a UI-only template. No API request was made.",
    });

    setPending(false);

    if (isEdit) {
      onSuccess?.(initialValues?.id);
    } else {
      onSuccess?.(`meeting_${Date.now()}`);
    }
  });

  return (
    <>
      <NewAgentDialog
        open={openNewAgentDialog}
        onOpenChange={setOpenNewAgentDialog}
      />
      <Form {...form}>
        <form className="space-y-4" onSubmit={onSubmit}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Math consultations" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="agentId"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options={agents.map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="border size-6"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    onSearch={setAgentSearch}
                    value={field.value}
                    placeholder="Select an agent"
                  />
                </FormControl>
                <FormDescription>
                  Not found what you&apos;re looking for?{" "}
                  <button
                    type="button"
                    className="underline text-primary"
                    onClick={() => setOpenNewAgentDialog(true)}
                  >
                    Create new Agent
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-x-2">
            {onCancel && (
              <Button
                variant="outline"
                disabled={isPending}
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            )}
            <Button disabled={isPending} type="submit">
              {isEdit ? "Update Meeting" : "Create Meeting"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
