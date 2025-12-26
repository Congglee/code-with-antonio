import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockTasks } from "@/mocks";
import { Task } from "@/features/tasks/types";

type ResponseType = {
  data: Task;
};

type RequestType = {
  json: Partial<Task>;
  param: { taskId: string };
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const taskIndex = mockTasks.findIndex((t) => t.$id === param.taskId);
      if (taskIndex === -1) {
        throw new Error("Task not found");
      }

      mockTasks[taskIndex] = { ...mockTasks[taskIndex], ...json };

      return { data: mockTasks[taskIndex] };
    },
    onSuccess: ({ data }) => {
      toast.success("Task updated!");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
    },
    onError: () => {
      toast.error("Failed to update task");
    },
  });

  return mutation;
};
