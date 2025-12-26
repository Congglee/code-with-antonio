import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error>({
    mutationFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      toast.success("You have logged out of your account!");
      router.refresh();
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error("Failed to disconnect from your account.");
    },
  });

  return mutation;
};
