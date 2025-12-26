import { useQuery } from "@tanstack/react-query";
import { TaskStatus } from "@/features/tasks/types";
import { mockTasks, mockProjects, mockMembers } from "@/mocks";

interface UseGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
}

export const useGetTasks = ({
  workspaceId,
  projectId,
  status,
  assigneeId,
  dueDate,
  search,
}: UseGetTasksProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      status,
      search,
      assigneeId,
      dueDate,
    ],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      let tasks = mockTasks.filter((task) => task.workspaceId === workspaceId);

      if (projectId) {
        tasks = tasks.filter((task) => task.projectId === projectId);
      }

      if (status) {
        tasks = tasks.filter((task) => task.status === status);
      }

      if (assigneeId) {
        tasks = tasks.filter((task) => task.assigneeId === assigneeId);
      }

      if (dueDate) {
        tasks = tasks.filter((task) => task.dueDate === dueDate);
      }

      if (search) {
        tasks = tasks.filter((task) =>
          task.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      return {
        documents: tasks,
        total: tasks.length,
      };
    },
  });

  return query;
};
