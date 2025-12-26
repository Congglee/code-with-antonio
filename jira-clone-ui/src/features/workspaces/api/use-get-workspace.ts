import { useQuery } from "@tanstack/react-query";
import { mockWorkspaces } from "@/mocks";

interface UseGetWorkspaceProps {
  workspaceId: string;
}

export const useGetWorkspace = ({ workspaceId }: UseGetWorkspaceProps) => {
  const query = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const workspace = mockWorkspaces.find((w) => w.$id === workspaceId);

      if (!workspace) {
        throw new Error("Failed to fetch workspace");
      }

      return workspace;
    },
  });

  return query;
};
