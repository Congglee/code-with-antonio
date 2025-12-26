import { useQuery } from "@tanstack/react-query";

interface UseGetProjectAnalyticsProps {
  projectId: string;
}

export type ProjectAnalyticsResponseType = {
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

export const useGetProjectAnalytics = ({
  projectId,
}: UseGetProjectAnalyticsProps) => {
  const query = useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const data: ProjectAnalyticsResponseType = {
        taskCount: 8,
        taskDifference: 1,
        assignedTaskCount: 3,
        assignedTaskDifference: 0,
        completedTaskCount: 2,
        completedTaskDifference: 1,
        overdueTaskCount: 0,
        overdueTaskDifference: 0,
        incompleteTaskCount: 6,
        incompleteTaskDifference: 0,
      };

      return data;
    },
  });

  return query;
};
