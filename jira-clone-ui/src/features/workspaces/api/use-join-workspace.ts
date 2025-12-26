import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockWorkspaces } from "@/mocks";
import { Workspace } from "@/features/workspaces/types";

type ResponseType = {
  data: Workspace;
};

type RequestType = {
  json: { code: string };
  param: { workspaceId: string };
};

export const useJoinWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const workspace = mockWorkspaces.find((w) => w.$id === param.workspaceId);

      if (!workspace || workspace.inviteCode !== json.code) {
        throw new Error("Failed to join workspace");
      }

      return { data: workspace };
    },
    onSuccess: ({ data }) => {
      toast.success("Joined workspace");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Failed to join workspace");
    },
  });

  return mutation;
};
