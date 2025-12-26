import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockWorkspaces } from "@/mocks";
import { Workspace } from "@/features/workspaces/types";

type ResponseType = {
  data: Workspace;
};

type RequestType = {
  param: { workspaceId: string };
};

export const useResetInviteCode = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const workspace = mockWorkspaces.find((w) => w.$id === param.workspaceId);

      if (!workspace) {
        throw new Error("Failed to reset invite code");
      }

      workspace.inviteCode = Math.random().toString(36).substring(7);

      return { data: workspace };
    },
    onSuccess: ({ data }) => {
      toast.success("Invite code reset");

      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Failed to reset invite code");
    },
  });

  return mutation;
};
