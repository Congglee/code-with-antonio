import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockProjects } from "@/mocks";
import { Project } from "@/features/projects/types";

type ResponseType = {
  data: Project;
};

type RequestType = {
  param: { projectId: string };
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = mockProjects.findIndex((p) => p.$id === param.projectId);
      if (index === -1) {
        throw new Error("Project not found");
      }

      const [deletedProject] = mockProjects.splice(index, 1);

      return { data: deletedProject };
    },
    onSuccess: ({ data }) => {
      toast.success("Project deleted!");

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
    },
    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  return mutation;
};
