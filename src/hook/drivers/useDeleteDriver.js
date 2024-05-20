import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDriver } from "../../server/apiAdmin";

export function useDeleteDriver() {
  const queryClient = useQueryClient();

  const { mutate: deleteDriverMutation, isDeleting } = useMutation({
    mutationFn: (id) => deleteDriver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });
    },
  });

  return {
    deleteDriver: deleteDriverMutation,
    isDeleting,
  };
}
