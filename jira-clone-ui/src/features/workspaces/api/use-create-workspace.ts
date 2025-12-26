import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { mockWorkspaces } from "@/mocks";
import { Workspace } from "@/features/workspaces/types";

type ResponseType = {
  data: Workspace;
};

type RequestType = {
  form: {
    name: string;
    image?: File | string;
  };
};

export const useCreateWorkspace = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newWorkspace: Workspace = {
        $id: `workspace-${Date.now()}`,
        $collectionId: "workspaces",
        $databaseId: "db-1",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        name: form.name,
        imageUrl: "", // Handle image upload mock if needed
        inviteCode: Math.random().toString(36).substring(7),
        userId: "user-1",
      };

      mockWorkspaces.push(newWorkspace);

      return { data: newWorkspace };
    },
    onSuccess: () => {
      toast.success("Workspace created!");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: () => {
      toast.error("Failed to create workspace");
    },
  });

  return mutation;
};
