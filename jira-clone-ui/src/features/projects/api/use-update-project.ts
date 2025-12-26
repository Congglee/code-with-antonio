import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockProjects } from "@/mocks";
import { Project } from "@/features/projects/types";

type ResponseType = {
  data: Project;
};

type RequestType = {
  form: { name?: string; image?: File | string };
  param: { projectId: string };
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form, param }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = mockProjects.findIndex((p) => p.$id === param.projectId);
      if (index === -1) {
        throw new Error("Project not found");
      }

      if (form.name) {
        mockProjects[index].name = form.name;
      }
      // Handle image update mock

      return { data: mockProjects[index] };
    },
    onSuccess: ({ data }) => {
      toast.success("Project updated!");

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  return mutation;
};
