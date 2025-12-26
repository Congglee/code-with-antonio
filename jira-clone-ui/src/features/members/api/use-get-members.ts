import { useQuery } from "@tanstack/react-query";
import { mockMembers } from "@/mocks";

interface UseGetMembersProps {
  workspaceId: string;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const members = mockMembers.filter((m) => m.workspaceId === workspaceId);

      return { documents: members, total: members.length };
    },
  });

  return query;
};
