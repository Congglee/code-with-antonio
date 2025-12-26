import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockTasks } from "@/mocks";
import { TaskStatus } from "@/features/tasks/types";

type RequestType = {
  json: {
    tasks: {
      $id: string;
      status: TaskStatus;
      position: number;
    }[];
  };
};

type ResponseType = {
  data: {
    $id: string;
    status: TaskStatus;
    position: number;
  }[];
};

export const useBulkUpdateTasks = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedTasks = json.tasks.map((updatedTask) => {
        const taskIndex = mockTasks.findIndex((t) => t.$id === updatedTask.$id);
        if (taskIndex !== -1) {
          mockTasks[taskIndex] = {
            ...mockTasks[taskIndex],
            status: updatedTask.status,
            position: updatedTask.position,
          };
          return mockTasks[taskIndex];
        }
        return null;
      });

      return { data: json.tasks }; // Simplified return
    },
    onSuccess: () => {
      toast.success("Tasks updated!");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
    },
    onError: () => {
      toast.error("Failed to update tasks");
    },
  });

  return mutation;
};
