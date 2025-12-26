import { useQuery } from "@tanstack/react-query";
import { mockTasks, mockProjects, mockMembers } from "@/mocks";

interface UseGetTaskProps {
  taskId: string;
}

export const useGetTask = ({ taskId }: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const task = mockTasks.find((t) => t.$id === taskId);

      if (!task) {
        throw new Error("Failed to fetch task");
      }

      return task;
    },
  });

  return query;
};
