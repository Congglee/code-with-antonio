import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockTasks } from "@/mocks";
import { Task } from "@/features/tasks/types";

type ResponseType = {
  data: Task;
};

type RequestType = {
  param: { taskId: string };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const taskIndex = mockTasks.findIndex((t) => t.$id === param.taskId);
      if (taskIndex === -1) {
        throw new Error("Task not found");
      }

      const [deletedTask] = mockTasks.splice(taskIndex, 1);

      return { data: deletedTask };
    },
    onSuccess: ({ data }) => {
      toast.success("Task deleted!");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
    },
    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  return mutation;
};
