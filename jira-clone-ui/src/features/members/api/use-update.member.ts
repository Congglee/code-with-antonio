import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mockMembers } from "@/mocks";
import { Member, MemberRole } from "@/features/members/types";

type ResponseType = {
  data: Member;
};

type RequestType = {
  json: { role: MemberRole };
  param: { memberId: string };
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const index = mockMembers.findIndex((m) => m.$id === param.memberId);
      if (index === -1) {
        throw new Error("Member not found");
      }

      mockMembers[index].role = json.role;

      return { data: mockMembers[index] };
    },
    onSuccess: () => {
      toast.success("Member updated!");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: () => {
      toast.error("Failed to update member");
    },
  });

  return mutation;
};
