import { useQuery } from "@tanstack/react-query";

interface UseGetWorkspaceAnalyticsProps {
  workspaceId: string;
}

export type WorkspaceAnalyticsResponseType = {
  taskCount: number;
  taskDifference: number;
  assignedTaskCount: number;
  assignedTaskDifference: number;
  completedTaskCount: number;
  completedTaskDifference: number;
  overdueTaskCount: number;
  overdueTaskDifference: number;
  incompleteTaskCount: number;
  incompleteTaskDifference: number;
};

export const useGetWorkspaceAnalytics = ({
  workspaceId,
}: UseGetWorkspaceAnalyticsProps) => {
  const query = useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock analytics data
      const data: WorkspaceAnalyticsResponseType = {
        taskCount: 12,
        taskDifference: 2,
        assignedTaskCount: 5,
        assignedTaskDifference: 1,
        completedTaskCount: 3,
        completedTaskDifference: 0,
        overdueTaskCount: 1,
        overdueTaskDifference: -1,
        incompleteTaskCount: 9,
        incompleteTaskDifference: 2,
      };

      return data;
    },
  });

  return query;
};
