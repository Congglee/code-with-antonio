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

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = mockWorkspaces.findIndex(
        (w) => w.$id === param.workspaceId
      );
      if (index === -1) {
        throw new Error("Workspace not found");
      }

      const [deletedWorkspace] = mockWorkspaces.splice(index, 1);

      return { data: deletedWorkspace };
    },
    onSuccess: ({ data }) => {
      toast.success("Workspace deleted!");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete workspace");
    },
  });

  return mutation;
};
