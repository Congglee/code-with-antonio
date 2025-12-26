import { useQuery } from "@tanstack/react-query";
import { mockProjects } from "@/mocks";

interface UseGetProjectsProps {
  workspaceId: string;
}

export const useGetProjects = ({ workspaceId }: UseGetProjectsProps) => {
  const query = useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const projects = mockProjects.filter(
        (p) => p.workspaceId === workspaceId
      );

      return { documents: projects, total: projects.length };
    },
  });

  return query;
};
