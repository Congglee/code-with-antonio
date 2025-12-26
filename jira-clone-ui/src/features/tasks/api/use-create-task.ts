import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockTasks } from "@/mocks";
import { Task } from "@/features/tasks/types";

type RequestType = {
  json: any; // Using any for simplicity in mock, ideally should match schema
};

type ResponseType = {
  data: Task;
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newTask: Task = {
        $id: `task-${Date.now()}`,
        $collectionId: "tasks",
        $databaseId: "db-1",
        $createdAt: new Date().toISOString(),
        $updatedAt: new Date().toISOString(),
        $permissions: [],
        ...json,
      };

      mockTasks.push(newTask);

      return { data: newTask };
    },
    onSuccess: () => {
      toast.success("Task created!");

      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["project-analytics"] });
      queryClient.invalidateQueries({ queryKey: ["workspace-analytics"] });
    },
    onError: () => {
      toast.error("Failed to create task");
    },
  });

  return mutation;
};
