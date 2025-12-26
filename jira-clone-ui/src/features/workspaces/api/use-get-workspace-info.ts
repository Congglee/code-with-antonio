import { useQuery } from "@tanstack/react-query";
import { mockWorkspaces } from "@/mocks";

interface UseGetWorkspaceInfoProps {
  workspaceId: string;
}

export const useGetWorkspaceInfo = ({
  workspaceId,
}: UseGetWorkspaceInfoProps) => {
  const query = useQuery({
    queryKey: ["workspace-info", workspaceId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const workspace = mockWorkspaces.find((w) => w.$id === workspaceId);

      if (!workspace) {
        throw new Error("Failed to fetch workspace info");
      }

      return {
        $id: workspace.$id,
        name: workspace.name,
        imageUrl: workspace.imageUrl,
      };
    },
  });

  return query;
};
