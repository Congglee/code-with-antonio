import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockProjects } from "@/mocks";
import { Project } from "@/features/projects/types";

type ResponseType = {
  data: Project;
};

type RequestType = {
  form: { name: string; image?: File | string; workspaceId: string };
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ form }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newProject: Project = {
        $id: `project-${Date.now()}`,
        $collectionId: "projects",
        $databaseId: "db-1",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        name: form.name,
        imageUrl: "", // Handle image upload mock
        workspaceId: form.workspaceId,
      };

      mockProjects.push(newProject);

      return { data: newProject };
    },
    onSuccess: () => {
      toast.success("Project created!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Failed to create project");
    },
  });

  return mutation;
};
