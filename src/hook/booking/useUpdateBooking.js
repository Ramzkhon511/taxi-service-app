import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../server/apiTaxi";
import toast from "react-hot-toast";

export function useUpdateBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateBookingMutation, isLoading: isUpdating } = useMutation({
    mutationFn: (booking) => updateBooking(booking),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
    onError: (error) => {
      toast.error("Failed to update booking");
    },
  });

  return {
    updateBooking: updateBookingMutation,
    isUpdating,
  };
}
