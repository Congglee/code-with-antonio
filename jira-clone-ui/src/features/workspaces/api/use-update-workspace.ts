import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockWorkspaces } from "@/mocks";
import { Workspace } from "@/features/workspaces/types";

type ResponseType = {
  data: Workspace;
};

type RequestType = {
  form: { name?: string; image?: File | string };
  param: { workspaceId: string };
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const workspace = mockWorkspaces.find((w) => w.$id === param.workspaceId);

      if (!workspace) {
        throw new Error("Failed to update workspace");
      }

      if (form.name) {
        workspace.name = form.name;
      }
      // Handle image update mock if needed

      return { data: workspace };
    },
    onSuccess: ({ data }) => {
      toast.success("Workspace updated!");

      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      queryClient.invalidateQueries({ queryKey: ["workspace", data.$id] });
    },
    onError: () => {
      toast.error("Failed to update workspace");
    },
  });

  return mutation;
};
