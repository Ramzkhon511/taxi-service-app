import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateDriver } from "../../server/apiTaxi";
import toast from "react-hot-toast";

export function useUpdateDriver() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateDriverMutation, isLoading: isUpdating } = useMutation({
    mutationFn: (driver) => updateDriver(driver),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["drivers"],
      });

      toast.success("Driver updated successfully");

      // navigate(`/active/${data[0].id}`);
    },
    onError: (error) => {
      toast.error("Failed to update driver");
    },
  });

  return {
    updateDriver: updateDriverMutation,
    isUpdating,
  };
}
