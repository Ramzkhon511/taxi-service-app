import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDriver } from "../../server/apiAdmin";
import toast from "react-hot-toast";

export function useCreateDriver() {
  const queryClient = useQueryClient();

  const { mutate: createDriverMutation, isLoading: isCreating } = useMutation({
    mutationFn: (driver) => createDriver(driver),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });

      toast.success("Driver created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create driver");
    },
  });

  return {
    createDriver: createDriverMutation,
    isCreating,
  };
}
