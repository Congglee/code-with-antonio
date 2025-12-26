import { useQuery } from "@tanstack/react-query";
import { mockProjects } from "@/mocks";

interface UseGetProjectProps {
  projectId: string;
}

export const useGetProject = ({ projectId }: UseGetProjectProps) => {
  const query = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const project = mockProjects.find((p) => p.$id === projectId);

      if (!project) {
        throw new Error("Failed to fetch project");
      }

      return project;
    },
  });

  return query;
};
