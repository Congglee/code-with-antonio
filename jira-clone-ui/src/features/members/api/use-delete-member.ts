import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockMembers } from "@/mocks";
import { Member } from "@/features/members/types";

type ResponseType = {
  data: Member;
};

type RequestType = {
  param: { memberId: string };
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = mockMembers.findIndex((m) => m.$id === param.memberId);
      if (index === -1) {
        throw new Error("Member not found");
      }

      const [deletedMember] = mockMembers.splice(index, 1);

      return { data: deletedMember };
    },
    onSuccess: () => {
      toast.success("Member deleted!");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => {
      toast.error("Failed to delete member");
    },
  });

  return mutation;
};
