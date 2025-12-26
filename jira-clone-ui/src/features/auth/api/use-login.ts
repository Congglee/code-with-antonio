import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequestType = {
  json: { email: string; password: string };
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation<any, Error, RequestType>({
    mutationFn: async ({ json }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (json.email === "error@example.com") {
        throw new Error("Failed to login");
      }

      return { success: true };
    },
    onSuccess: () => {
      toast.success("You are now logged in!");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
    onError: () => {
      toast.error("Failed to log into your account.");
    },
  });

  return mutation;
};
