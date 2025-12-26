import { useQuery } from "@tanstack/react-query";
import { mockWorkspaces } from "@/mocks";

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      return { documents: mockWorkspaces, total: mockWorkspaces.length };
    },
  });

  return query;
};
